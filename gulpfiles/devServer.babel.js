import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import path from 'path';

const PROJ_ROOT = path.join(__dirname, '..');
// const SRC_DIR = path.join(PROJ_ROOT, 'src');
const DEV_DIR = path.join(PROJ_ROOT, 'dev');

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: DEV_DIR
    }
  });
});

// Watchers
gulp.task('watch', function() {
  gulp.watch(path.join(DEV_DIR, '**/*.css'), browserSync.reload);
  gulp.watch(path.join(DEV_DIR, '**/*.html'), browserSync.reload);
  gulp.watch(path.join(DEV_DIR, '**/*.js'), browserSync.reload);
});

gulp.task('devServer', function(callback) {
  runSequence(['browserSync', 'watch'],
    callback
  );
});
