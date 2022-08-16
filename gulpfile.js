let {
    src,
    dest,
    series,
    watch
} = require("gulp")

let zip = require('gulp-zip')
let clean = require("gulp-clean")
let webpack = require('webpack');
let webpackStream = require('webpack-stream');
let webpackConfig = require('./webpack.config.js');
let replace = require('gulp-replace')

function cleanDistDir() {
    return src("./dist/*")
        .pipe(clean())
}

function runWebpack() {
    return src("./src/index.ts")
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(dest("./dist"))
}

function copyIntegrationFiles() {
    return src("./integration/**/*")
        .pipe(dest("./dist"))
}

function zipFiles() {
    return src("dist/**/*")
        .pipe(zip('widget.zip'))
        .pipe(dest("./dist"))
}

function setWidgetFunctionName() {
    return src("./dist/script.js")
        .pipe(replace("_define", "define"))
        .pipe(dest("./dist"))
}

let buildSeries = series(
    cleanDistDir,
    runWebpack,
    setWidgetFunctionName,
    copyIntegrationFiles,
    zipFiles
)

exports.build = buildSeries

exports.watch = function () {
    watch("./src/**/*.ts", buildSeries)
}

exports.clean = cleanDistDir

exports.default = buildSeries