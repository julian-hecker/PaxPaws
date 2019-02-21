// Include Plugins
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const paths = {
  html: {

  },
  sass: {
    source: 'src/scss/*.+(scss|sass)',
    destination: 'src/css/'
  },
  css: {
    source: 'src/css/*.css',
    destination: 'dist/css/'
  },
  js: {

  }
};

function scss() {
  return gulp.src(paths.sass.src)
    .pipe(gulpSass())
    .pipe(gulp.dest(paths.sass.dest));
}




// exports.build = gulp.series();
// exports.watch = gulp.series();
exports.default = gulp.series(scss);