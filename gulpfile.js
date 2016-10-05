var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
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

var languages = require(path.join(JS_DIR, 'languages.json'));

var templateOptions = {
  ignorePartials: false,
  batch : [PARTIAL_DIR],
  // hack for batching helpers, see:
  // https://github.com/kaanon/gulp-compile-handlebars/pull/6
  helpers : (function() {
    var helpers = {};
    // Get a list of all the helpers in the folder
    var helperFiles = glob.sync(path.join(HELPER_DIR, '*.js'), {});
    console.log(helperFiles);
    helperFiles.forEach( function(filePath) {
      var pathParts = parsePath(filePath);
      console.log(pathParts.name);
      try {
        helpers[pathParts.name] = require(filePath);
      } catch(e) {
        console.log('ERROR in options helper-hack');
      }
    });
    console.log(helpers);
    return helpers;
  })(),
  compile: {
    data: {
      level: LOG_LEVEL,
    }
  }
};

gulp.task('rootIndex', function () {

  var templateData = {
    PROJ_ROOT, // __dirname in helpers points to HELPER_DIR
    languages,
  };
  console.log(templateData);

  return (
    gulp.src(path.join(TEMPLATE_DIR, 'mainIndex.hbs'))
    .pipe(handlebars(templateData, templateOptions))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(DEST_DIR))
  );
});

// render the hbs templates to HTML for all languages
// -- templates/*.hbs without 'mainIndex.hbs'
var hbsEntries = [];
var hbsFiles = glob.sync(path.join(TEMPLATE_DIR, '*.hbs'), {});
hbsFiles.forEach( function(hbsFile) {
  var pathParts = parsePath(hbsFile);
  if (pathParts.name !== "mainIndex") hbsEntries.push(pathParts.name);
});
console.log(hbsEntries);
var langDirs = languages.implemented;
var langTasks = [];

hbsEntries.forEach(function(hbsEntry) {
  var i18n = require(path.join(I18N_DIR, hbsEntry+'.json'));
  langDirs.forEach(function(lang) {
    var taskName = lang + hbsEntry;
    langTasks.push(taskName);
    gulp.task(taskName, function() {
      var templateData = {
        PROJ_ROOT, // __dirname in helpers points to HELPER_DIR
        lang,
        implemented: langDirs,
        page: hbsEntry,
        t: _.mapValues(i18n, lang) // extract texts for actual language
      };
      console.log(templateData);
      return (
        gulp.src(path.join(TEMPLATE_DIR, hbsEntry + '.hbs'))
        .pipe(handlebars(templateData, templateOptions))
        .pipe(rename(hbsEntry + '.html'))
        .pipe(gulp.dest(path.join(DEST_DIR, lang)))
      );
    });
  });
});

gulp.task('renderLang', langTasks);
