
import * as fs from 'fs';
import {upperFirst, camelCase} from 'lodash';

let promise = require('bluebird');
let stat = promise.promisify(fs.stat);
let mkdir = promise.promisify(fs.mkdir);
let readFile = promise.promisify(fs.readFile);
let writeFile = promise.promisify(fs.writeFile);

let args = process.argv.slice(2);
let slideName = args[0];
if(!slideName) {
    throw new Error("Provide the name of the slide to add.");
}

console.log(`Adding slide ${slideName} ...`);

let slidePath = `app/slides/${slideName}`;
stat(slidePath)
    .then(
        () => { throw new Error("Slide directory already exists."); },
        () => mkdir(slidePath))
    .then(() => ({
        slidePath,
        slideName,
        componentName: upperFirst(camelCase(slideName))
    }))
    .then(details => promise
        .all([
            writeFile(`${details.slidePath}/${details.slideName}.component.ts`, componentTemplate(details)),
            writeFile(`${details.slidePath}/${details.slideName}.component.html`, htmlTemplate(details)),
            writeFile(`${details.slidePath}/${details.slideName}.component.scss`, scssTemplate(details)),
        ])
        .then(() => details)
    )
    .then(details => promise
        .all([
            details,
            readFile('app/slides.ts', 'utf8'),
            readFile('app/app.component.html', 'utf8')
        ])
    )
    .then(data => {
        let details = data[0];
        let slidesContent = addComponentArrayElement(details, addComponentImport(details, data[1]));
        let htmlContent = addHtmlElement(details, data[2]);
        return promise
            .all([
                writeFile('app/slides.ts', slidesContent),
                writeFile('app/app.component.html', htmlContent)
            ])
            .then(() => details)
    })
    .catch((err) => {
        console.log(err);
    });

function componentTemplate(details) {
    return `
import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: '${details.slideName}',
    styleUrls: ['${details.slideName}.component.css'],
    templateUrl: '${details.slideName}.component.html'
})
export class ${details.componentName}Component { }
`;
}

function htmlTemplate(details) {
    return `
<div class="content">
    <h1>${details.slideName}</h1>
</div>
`;
}

function scssTemplate(details) {
    return `
div.content {
}
`;
}

function addComponentImport(details, content) {
    let {componentName, slideName} = details;
    let importRegex = /[\s\r\n]+export const SLIDE_COMPONENTS/;
    let importText = `
import {${componentName}Component} from './slides/${slideName}/${slideName}.component';
            
export const SLIDE_COMPONENTS`;
    return content.replace(importRegex, importText);
}

function addComponentArrayElement(details, content) {
    let {componentName} = details;
    let componentsRegex = /[\s\r\n]+\];/;
    let componentsText = `,
    ${details.componentName}Component
];`;
    return content.replace(componentsRegex, componentsText);
}

function addHtmlElement(details, content) {
    let {slideName} = details;
    let htmlRegex = /[\s\r\n]+<!-- next slide here -->/;
    let htmlText = `
    <${details.slideName} *viewSlide="false"></${details.slideName}>
    <!-- next slide here -->`;
    return content.replace(htmlRegex, htmlText);
}
