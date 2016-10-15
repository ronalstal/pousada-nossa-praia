import gulp from 'gulp';
// import runSequence from 'run-sequence';
import path from 'path';
// import glob from 'glob';
import del from 'del';

const PROJ_ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(PROJ_ROOT, 'src');
const STATIC_DIR = path.join(SRC_DIR, 'static');
const DEV_DIR = path.join(PROJ_ROOT, 'dev');
const ASSETS_DIR = path.join(DEV_DIR, 'assets');

// remove dev directoy
gulp.task('clean', function() {
  // remove .dot files; leave directories
  // force delete outside of cwd
  const options = {dot: true, nodir: true, force: true};
  return (
    del(path.join(DEV_DIR, '**/*'), options)
  );
});

// copy all files from /src/static to /dev/assets
// TODO: copy only newer files
// const options = {dot: true, nodir: true};
// const files = glob.sync(path.join(SRC_DIR, 'static', '**/*'), options);
gulp.task('copyAssets', function() {
  return (
    gulp.src(path.join(STATIC_DIR, '**/*'))
    .pipe(gulp.dest(ASSETS_DIR))
  );
});
