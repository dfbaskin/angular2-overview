module.exports = {
    server: {
        middleware: {
            0: null // removes default `connect-logger` middleware
        }
    },
    snippetOptions: {
        blacklist: [
            "/app/slides/**/source/**/*.html"
        ]
    }
};
