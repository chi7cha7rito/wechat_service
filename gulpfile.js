'use strict'

var gulp = require('gulp')
var clean = require('gulp-clean')
var less = require('gulp-less')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var jshint = require('gulp-jshint')
var rename = require('gulp-rename')
var plumber = require('gulp-plumber')
var minifyCss = require('gulp-minify-css')
var gulpSequence = require('gulp-sequence')
var copy = require('gulp-copy')
var gulpif = require('gulp-if')
var requirejsOptimize = require('gulp-requirejs-optimize')
var isTest = gulp.env.env === 'test'
var os = require('os');

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
需要编译到css目录下对应目录的less文件路径定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
var pathLess = [
  'static/less/app.less',
  'static/less/*/*/*.less',
  'static/less/*/*.less',
  '!static/less/components/*.less',
  '!static/less/mixins/*.less'
]

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
需要编译到js目录下对应目录的jssrc目录源文件路径定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
var pathJs = [
  'static/jssrc/*/*/*.js',
  'static/jssrc/*/*.js',
  '!static/jssrc/lib/*.js',
  '!static/jssrc/components/*.js'
]

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
对需要合并到app.js的脚本文件路径的定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
var pathAppJs = [
  'static/jssrc/lib/jquery-2.1.4.js',
  'static/jssrc/lib/jquery-weui.js',
  'static/jssrc/lib/jquery.cookie.js',
  'static/jssrc/lib/moment-2.17.1.js',
  'static/jssrc/lib/controller.js'
]

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
定义清空编译目录(css | js)任务
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
gulp.task('clean', function () {
  return gulp.src([
    'static/css',
    'static/js'
  ], {
    read: false
  })
    .pipe(clean())
})
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
定义对less编译的任务
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
gulp.task('less', function () {
  return gulp.src(pathLess)
    .pipe(less())
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('static/css'))
})

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
定义对核心js合并的任务
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
gulp.task('js-app', function () {
  return gulp.src(pathAppJs)
    .pipe(plumber())
    .pipe(concat('app.min.js'))
    .pipe(gulpif(isTest, uglify()))
    .pipe(gulp.dest('static/js'))
})
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
定义对jssrc目录脚本的编译任务
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
gulp.task('js', function () {
  return gulp.src(pathJs)
    .pipe(plumber())
    .pipe(gulpif(isTest, uglify()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('static/js'))
})

gulp.task('copyFont', function () {
  return gulp.src('static/fonts/**')
    .pipe(plumber())
    .pipe(gulp.dest('static/css/fonts/'))
})

gulp.task('rjs', function () {
  var osType = os.platform()
  return gulp.src(['static/jssrc/**/*.js', '!static/jssrc/lib/*.js', '!static/jssrc/components/*.js'])
    .pipe(requirejsOptimize(function (file) {
      var fileName = ''
      if (osType === 'win32' || osType === 'win64') {
        fileName = file.relative.replace(/(\w+)\\([A-Za-z0-9-_]+)\.js$/, '$1/$2')
      } else if (osType === 'linux' || osType === 'darwin') {
        fileName = file.relative.replace(/\.js$/, '')
      }
      console.log(fileName)
      return {
        baseUrl: 'static/jssrc',
        optimize: 'none',
        name: '' + fileName,
        include: ''
      }
    }))
    .pipe(gulpif(isTest, uglify()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('static/js'))
})

/*-----------------------------------------------------------------------------------------------------------
定义watch任务
-----------------------------------------------------------------------------------------------------------*/
gulp.task('watch', function () {
  gulp.watch('static/less/**/**/**.less', ['less', 'copyFont'])
  gulp.watch(pathAppJs, ['js-app'])
  // gulp.watch(pathJs, ['js'])
  gulp.watch(pathJs, ['rjs'])
})

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
定义复合任务方便gulp命令一步执行，包括：
1. 清空编译目录
2. 编译less
3. 合并压缩相应文件到app.min.js
4. 编译脚本
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
gulp.task('default', ['watch'])
gulp.task('build', gulpSequence('clean', 'less','copyFont','js','rjs','js-app' ))
