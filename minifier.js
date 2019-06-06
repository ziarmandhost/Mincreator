const fs = require('fs');

const htmlMinifier = require('html-minifier').minify;
const CleanCSS = require('clean-css');
const UglifyJS = require("uglify-js");

class Minifier {
    constructor (file) {
        this.file = file;
    }

    minifyByType (callback) {
        switch (this.file.ext) {
            case "html" :
            case "htm" :
            case "xhtml" :
            case "xht" :
                this.minifyHtml(callback);
                break;
            case "css" :
                this.minifyCss(callback);
                break;
            case "js" :
                this.minifyJs(callback);
                break;
            case "jpg" :
                this.minifyJpg(callback);
                break;
            default :
                return {error : true, message : "This file type is not supported!"};
        }
    }

    minifyHtml (callback) {
        fs.readFile(this.file.path, "UTF-8", (err, data) => {
            if (err) callback({error : true, message : "The problem with minimizing this file!"});
            else {
                callback(htmlMinifier(data, {
                    collapseBooleanAttributes : true,
                    minifyCSS : true,
                    minifyJS : true,
                    minifyURLs : true,
                    removeAttributeQuotes : true,
                    removeComments : true,
                    removeEmptyAttributes : true,
                    removeOptionalTags : true,
                    useShortDoctype : true,
                    collapseWhitespace: true
                }));
            }
        });
    }

    minifyCss (callback) {
        fs.readFile(this.file.path, "UTF-8", (err, data) => {
            if (err) callback({error : true, message : "The problem with minimizing this file!"});
            else {
                let output = new CleanCSS({
                    level: {
                        2: {
                            all : true
                        }
                    }
                }).minify(data);

                output.errors.length !== 0 ? callback({error : true, message : "The problem with minimizing this file!"}) : callback(output.styles);
            }
        });
    }

    minifyJs (callback) {
        fs.readFile(this.file.path, "UTF-8", (err, data) => {
            if (err) callback({error : true, message : "The problem with minimizing this file!"});
            else {
                let result = UglifyJS.minify(data, {
                    mangle: true,
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true
                    }
                });

                result.error ? callback({error : true, message : "The problem with minimizing this file!"}) : callback(result.code);
            }
        });
    }
}

module.exports.Minifier = Minifier;