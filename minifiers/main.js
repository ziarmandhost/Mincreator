class Minifier {
    constructor (file) {
        this.file = file;
    }

    minify (params) {
        let settins = {
          defult : "settings"
        };

        if (params) {
            // user sended custom params, i need to rewrite settings
        }

        minifyByType(settins);
    }

    minifyByType (settins) {
        switch (this.file.ext) {
            case "html" :
                let minified = minifyHtml(settins);
                return (minified.error ? minified.message : minified.code);
            case "css" :
                return "css";
            case "js" :
                return "js";
        }
    }

    minifyHtml (settins) {
        return "minified html string"
    }
}

module.exports.Minifier = Minifier;