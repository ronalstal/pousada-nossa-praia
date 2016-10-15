import gulp from 'gulp';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
// import uglify from 'gulp-uglify';
// import cssnano from 'gulp-cssnano';
// import imagemin from 'gulp-imagemin';
import path from 'path';
// import glob from 'glob';
// import _ from 'lodash';

const PROJ_ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(PROJ_ROOT, 'src');
// var JS_DIR = path.join(SRC_DIR, 'js');
const STYLE_DIR = path.join(SRC_DIR, 'styles');
const BOOTSTRAP_DIR = path.join(PROJ_ROOT, 'node_modules', 'bootstrap');
const BOOTSTRAP_SCSS = path.join(BOOTSTRAP_DIR, 'scss');
const BOOTSTRAP_JS = path.join(BOOTSTRAP_DIR, 'js', 'dist');
var DEST_CSS_DIR = path.join(PROJ_ROOT, 'dev', 'assets', 'styles');
var DEST_JS_DIR = path.join(PROJ_ROOT, 'dev', 'assets', 'js');
// var LOG_LEVEL = handlebars.Handlebars.logger.DEBUG;

gulp.task('scss', function () {

  return (
    gulp.src(path.join(STYLE_DIR, 'main.scss'))
    .pipe(sourceMaps.init())
    .pipe(sass({
      includePaths: [STYLE_DIR, BOOTSTRAP_SCSS],
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(DEST_CSS_DIR))
  );
});

// concatenate the bootstrap javascript files
// TODO: only the scripts really used

gulp.task('js', function () {

  // const jsFiles = glob.sync(path.join(BOOTSTRAP_JS, '*.js'), {});
  // need specific sequence
  let jsFiles = [];
  jsFiles.push(path.join(BOOTSTRAP_JS, 'util.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'tooltip.js'));
  // jsFiles.push(path.join(BOOTSTRAP_JS, 'popover.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'alert.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'button.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'carousel.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'collapse.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'dropdown.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'modal.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'scrollspy.js'));
  jsFiles.push(path.join(BOOTSTRAP_JS, 'tab.js'));

  return (
    gulp.src(jsFiles)
    .pipe(sourceMaps.init())
    .pipe(concat('bootstrap.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(DEST_JS_DIR))
  );
});

gulp.task('style', ['scss', 'js']);
