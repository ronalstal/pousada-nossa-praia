var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var path = require('path');
var glob = require('glob');
var parsePath = require('parse-filepath');
// var lang = require('./src/assets/js/languages.json');

var SRC_DIR = path.join(__dirname, 'src');
var TEMPLATE_DIR = path.join(SRC_DIR, 'templates');
var PARTIAL_DIR = path.join(TEMPLATE_DIR, 'partials');
var HELPER_DIR = path.join(TEMPLATE_DIR, 'helpers');
var DEST_DIR = path.join(__dirname, 'dev');
var LOG_LEVEL = handlebars.Handlebars.logger.DEBUG;

var templateOptions = {
  ignorePartials: false,
  batch : [PARTIAL_DIR],
  // hack for batching helpers, see:
  // https://github.com/kaanon/gulp-compile-handlebars/pull/6
  helpers : (function() {
    var helpers = {};
    // Get a list of all the helpers in the folder
    var helperFiles = glob.sync(path.join(HELPER_DIR, '*.js'), {});
    helperFiles.forEach( function(filePath) {
      var pathParts = parsePath(filePath);
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
    username: 'Kaanon'
  };

  return (
    gulp.src(path.join(TEMPLATE_DIR, 'mainIndex.hbs'))
    .pipe(handlebars(templateData, templateOptions))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(DEST_DIR))
  );
});

var langDirs = ['A', 'B'];
var langEntries = ['index'];
var langTasks = [];

langEntries.forEach(function(langEntry) {
  langDirs.forEach(function(langDir) {
    var taskName = langDir + langEntry;
    langTasks.push(taskName);
    gulp.task(taskName, function() {
      var templateData = {
        lang: langDir,
        page: langEntry,
        myObj: {
          value1: "aaaaa",
          value2: "bbbbb",
        }
      };
      return (
        gulp.src(path.join(TEMPLATE_DIR, langEntry + '.hbs'))
        .pipe(handlebars(templateData, templateOptions))
        .pipe(rename(langEntry + '.html'))
        .pipe(gulp.dest(path.join(DEST_DIR, langDir)))
      );
    });
  });
});

gulp.task('renderLang', langTasks);
