var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vueLoader = require('vue-loader');
var outputDir = process.env.NODE_ENV == 'production' ? './dist' : './dev';

var config =  {
    entry: {
        pagination: "./demo/pagination/pagination.js",
        dialog: "./demo/dialog/dialog.js",
        datatable: "./demo/datatable/datatable.js",
        timepicker: "./demo/timepicker/timepicker.js",
        area: "./demo/area/area.js",
        global: "./demo/global.js"
    },
    output: {
        filename: `${outputDir}/js/[name].js`
    },
    module: {
        loaders: [
            {
                test: /.vue$/,
                loader: 'vue'
            },
            {
                test: /.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.js?$/,
                exclude: /node_modules\//,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(`${outputDir}/css/[name].css`)
    ],
    devtool: 'sourcemap',
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }

};

if (process.env.NODE_ENV == 'production') {
    console.log('使用线上配置进行打包');
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}

module.exports = config;
