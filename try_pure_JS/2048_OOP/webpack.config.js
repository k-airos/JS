let path = require('path');

module.exports ={
    mode: 'production',
    entry: './js/2048.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/js'
    },
    watch: true,

    devtool: "source-map",
    module: {}
};