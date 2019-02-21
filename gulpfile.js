// Include Plugins
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const paths = {
  html: {
    src: 'src/html/**/*.html',
    dest: 'dist/'
  },
  css: {
    src: 'src/css/**/*.css',
    dest: 'dist/css/'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  pug: {
    src: 'src/pug/**/*.pug',
    dest: ''
  },
  scss: {
    src: 'src/scss/**/*.+(scss|sass)',
    dest: 'src/css/'
  },
  watch: 'dist/**/*.*'
};

function html() {
  console.log("html");
}

function css() {
  console.log('css');
}

function js() {
  console.log('js');
}

function pug() {
  console.log('pug');
}

function scss() {
  return gulp.src(paths.scss.src)
    .pipe(gulpSass())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

function watch() {
  console.log('before init');
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
  console.log('after init');
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.js.src, js);
  gulp.watch(paths.pug.src, pug);
  gulp.watch(paths.scss.src, scss);
  gulp.watch(paths.watch).on('change', browserSync.reload);
}


// exports.build = gulp.series();
exports.scss = gulp.series(scss);
exports.watch = gulp.series(watch);
exports.default = gulp.series(watch);