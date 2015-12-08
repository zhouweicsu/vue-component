var webpack = require('webpack');
var vueLoader = require('vue-loader');

var config =  {
    entry: {
        pagination: "./demo/pagination/pagination.js"
    },
    output: {
        filename: `./dist/js/[name].js`
    },
    module: {
        loaders: [
            {
                test: /.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules\//,
                loader: 'babel'
            }
        ]
    },
    devtool: 'sourcemap',
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }
};

module.exports = config;
