var doxygen = require('doxygen');

var userOptions = {
    OUTPUT_DIRECTORY: "Docs",
    INPUT: "./server",
    RECURSIVE: "YES",
    FILE_PATTERNS = "*.js",
    FILTER_PATTERNS = "*.js=plugins/js2doxy/js2doxy.pl",
    EXTENSION_MAPPING: "js=Javascript",
    GENERATE_LATEX: "NO",
    EXCLUDE_PATTERNS: ["*/node_modules/*"]
};
 
doxygen.createConfig(userOptions);

doxygen.run();
