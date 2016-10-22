import gulp from 'gulp';
import handlebars from 'gulp-compile-handlebars';
import rename from 'gulp-rename';
import path from 'path';
import glob from 'glob';
import parsePath from 'parse-filepath';
import _ from 'lodash';
import parseArgs from 'minimist';
import parseArgsOptions from 'minimist-options';

const PROJ_ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(PROJ_ROOT, 'src');
const JS_DIR = path.join(SRC_DIR, 'js');
const TEMPLATE_DIR = path.join(SRC_DIR, 'templates');
const PARTIAL_DIR = path.join(TEMPLATE_DIR, 'partials');
const HELPER_DIR = path.join(TEMPLATE_DIR, 'helpers');
const I18N_DIR = path.join(TEMPLATE_DIR, 'i18n');
const DEST_DIR = path.join(PROJ_ROOT, 'dev');
const LOG_LEVEL = handlebars.Handlebars.logger.DEBUG;

const languages = require(path.join(JS_DIR, 'languages.json'));
const priv = require(path.join(JS_DIR, 'private.js'));
const targetSite = "http://localhost:3000";

const templateOptions = {
  ignorePartials: false,
  batch : [PARTIAL_DIR],
  // hack for batching helpers, see:
  // https://github.com/kaanon/gulp-compile-handlebars/pull/6
  helpers : (function() {
    const helpers = {};
    // Get a list of all the helpers in the folder
    const helperFiles = glob.sync(path.join(HELPER_DIR, '*.js'), {});
    // console.log(helperFiles);
    helperFiles.forEach( function(filePath) {
      var pathParts = parsePath(filePath);
      // console.log(filePath, pathParts.name);
      try {
        helpers[pathParts.name] = require(filePath);
      } catch(e) {
        console.log('ERROR in options helper-hack');
      }
    });
    // console.log('HELPERS ' + JSON.stringify(helpers));
    return helpers;
  })(),
  compile: {
    data: {
      level: LOG_LEVEL,
    }
  }
};

let argv = parseArgs(process.argv, opts=parseArgsOptions({
  targetSite: {
    type: 'string',
    aliases: 't',
    default: 'dev'
  }
}));

gulp.task('rootIndex', function () {

  const templateData = {
    PROJ_ROOT, // __dirname in helpers points to HELPER_DIR
    gaId: priv.gaId,
    targetSite: argv.targetSite,
    languages,
  };
  // console.log(templateData);

  return (
    gulp.src(path.join(TEMPLATE_DIR, 'mainIndex.hbs'))
    .pipe(handlebars(templateData, templateOptions))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(DEST_DIR))
  );
});

// render the hbs templates to HTML for all languages
// -- templates/*.hbs without 'mainIndex.hbs'
const hbsEntries = [];
const hbsFiles = glob.sync(path.join(TEMPLATE_DIR, '*.hbs'), {});
hbsFiles.forEach( function(hbsFile) {
  const pathParts = parsePath(hbsFile);
  if (pathParts.name !== "mainIndex") hbsEntries.push(pathParts.name);
});
// console.log('hbsEntries ' + hbsEntries);
const langDirs = languages.implemented;
const langTasks = [];

hbsEntries.forEach(function(hbsEntry) {
  // console.log('require I18N ' + path.join(I18N_DIR, hbsEntry+'.json'));
  const i18n = require(path.join(I18N_DIR, hbsEntry+'.json'));
  langDirs.forEach(function(lang) {
    const taskName = lang + hbsEntry;
    langTasks.push(taskName);
    // console.log ('TASK ' + taskName);
    gulp.task(taskName, function() {
      const templateData = {
        PROJ_ROOT, // __dirname in helpers points to HELPER_DIR
        gaId: priv.gaId,
        lang,
        targetSite: argv.targetSite,
        implemented: langDirs,
        page: hbsEntry,
        t: _.mapValues(i18n, lang) // extract texts for actual language
      };
      // console.log('templateData ' + JSON.stringify(templateData));
      return (
        gulp.src(path.join(TEMPLATE_DIR, hbsEntry + '.hbs'))
        .pipe(handlebars(templateData, templateOptions))
        .pipe(rename(hbsEntry + '.html'))
        .pipe(gulp.dest(path.join(DEST_DIR, lang)))
      );
    });
  });
});

gulp.task('langIndex', langTasks);
gulp.task('render', ['rootIndex', 'langIndex']);
