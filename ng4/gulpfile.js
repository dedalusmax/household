var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var prodConfig = require("./config/webpack.prod.js");

var tslint = require('gulp-tslint');

gulp.task("tslint", function (callback) {
    gulp.src('src/**/*.ts')
        .pipe(tslint({
            formatter: "stylish"
        }))
        .pipe(tslint.report({
            emitError: false,
            summarizeFailureOutput: true,
            reportLimit: 1000
        }));
});

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function (callback) {
    // run webpack
    webpack(prodConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function (callback) {
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackConfig), {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080");
    });
});