var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var path = require('path');
var glob = require('glob');
var parsePath = require('parse-filepath');
var _ = require('lodash');

var PROJ_ROOT = path.join(__dirname);
var SRC_DIR = path.join(PROJ_ROOT, 'src');
var JS_DIR = path.join(SRC_DIR, 'js');
var TEMPLATE_DIR = path.join(SRC_DIR, 'templates');
var PARTIAL_DIR = path.join(TEMPLATE_DIR, 'partials');
var HELPER_DIR = path.join(TEMPLATE_DIR, 'helpers');
var I18N_DIR = require(path.join(TEMPLATE_DIR, 'i18n'));
var DEST_DIR = path.join(PROJ_ROOT, 'dev');
var LOG_LEVEL = handlebars.Handlebars.logger.DEBUG;


gulp.task('rootIndex', function () {

  var templateData = {
    PROJ_ROOT, // __dirname in helpers points to HELPER_DIR
  };
  console.log(templateData);

  return (
    gulp.src(path.join(TEMPLATE_DIR, 'mainIndex.hbs'))
    .pipe(handlebars(templateData, templateOptions))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(DEST_DIR))
  );
});
