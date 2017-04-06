'use strict';

//const NODE_ENV = process.env.NODE_ENV || 'development';
// const webpack = require('webpack');

module.exports = {
    // entry: "./src/partials/**/*.js",

    // output: {
    //     path: "./dist/assets/scripts",
    //     filename: 'app.js',
    //     library: 'app'
    // },

    // watch: NODE_ENV == 'development',
    // watchOptions: {
    //     aggregateTimeout: 300
    // },

    module: {

        // loaders: [{
        //     test: /\.htm$/,
        //     loader: "html-loader"
        // }],
        rules: [{
            test: /\.tpl$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: false,
                    collapseWhitespace: true
                }
            }],
        }]
    },

    //devtool: NODE_ENV == 'development' ? 'source-map' : null,

    plugins: [
        //new webpack.EnvironmentPlugin('NODE_ENV')
    ]

}