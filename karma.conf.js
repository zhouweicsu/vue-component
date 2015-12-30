var webpackConfig = require("./webpack.config.js");

module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha'],
        reporters: ['nyan'],
        files: [
            'test/*_test.js',
            'test/**/*_test.js'
        ],

        preprocessors: {
            'test/*_test.js': ['webpack'],
            'test/**/*_test.js': ['webpack']
        },

        webpack: {
            module: webpackConfig.module,
            plugins: webpackConfig.plugins,
            devtool: webpackConfig.devtool,
            babel: webpackConfig.babel
        },

        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-nyan-reporter'
        ]

    });
};

