
import * as fs from 'fs';

let promise = require('bluebird');
let postcss = require('postcss');
let chokidar = require('chokidar');

let postCssPlugins = [
    require('precss')()
];

let glob = promise.promisify(require('glob'));
let readFile = promise.promisify(fs.readFile);
let writeFile = promise.promisify(fs.writeFile);

let watchFiles = false;
let scssFileGlobSpecs = [
    'css/**/*.scss',
    'app/**/*.scss'
];

process.argv.slice(2).forEach((arg) => {
    let r1 = /^--watch$/i;
    let r2 = /^-w$/i;
    if(r1.test(arg) || r2.test(arg)) {
        watchFiles = true;
    }
});

promise
    .all(scssFileGlobSpecs.map((globSpec) => glob(globSpec)))
    .then((result) => result.reduce((list, scssFiles) => list.concat(scssFiles), []))
    .then(buildCssFiles)
    .then(() => {
        console.log("Finished building CSS files.");
        if(watchFiles) {
            watchCssFiles();
        }
    })
    .catch((err) => console.error(err));

function buildCssFiles(scssFiles) {
    return promise
        .all(scssFiles
            .map((scssFile) => readFile(scssFile, "utf8")
                .then((content) => ({
                    scssFile: scssFile,
                    cssFile: scssFile.replace(/\.scss$/, ".css"),
                    content: content
                }))
            )
        )
        .then((files) => promise
            .all(files
                .map((file) => postcss(postCssPlugins)
                    .process(file.content, {
                        from: file.scssFile,
                        to: file.cssFile
                    })
                )
            )
        )
        .then((results) => promise
            .all(results
                .map((result) => {
                    let fileName = result.opts.to;
                    return writeFile(fileName, result.css, 'utf8')
                        .then(() => {
                            if(result.map) {
                                return writeFile(fileName + '.map', result.map, 'utf8');
                            }
                        });
                })
            )
        );
}

function watchCssFiles() {

    let watcher = chokidar.watch(scssFileGlobSpecs, {
        persistent: true,
        ignoreInitial: true
    });

    console.log("Watching for changes to CSS files ...");
    watcher
        .on('add', (path) => {
            console.log("Added: " + path);
            buildCssFiles([path]);
        })
        .on('change', (path) => {
            console.log("Changed: " + path);
            buildCssFiles([path]);
        });
}
