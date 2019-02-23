// Include Plugins
const del = require('del');
const imagemin = require('imagemin');
const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpCssnano = require('gulp-cssnano');
const gulpPug = require('gulp-pug');
const gulpSass = require('gulp-sass');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpUglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

const paths = {
  asset: {
    src: 'src/assets/**/*.*',
    dest: 'dist/assets/'
  },
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
    dest: 'dist/js/'
  },
  pug: {
    src: 'src/pug/**/*.pug',
    dest: 'src/html/'
  },
  scss: {
    src: 'src/scss/**/*.+(scss|sass)',
    dest: 'src/css/'
  },
  watch: 'dist/**/*.*'
};

function asset(){
  return gulp.src(paths.asset.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.asset.dest))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src(paths.html.src)
    .pipe(gulpHtmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest));
}

function css() {
  return console.log('css');
}

function js() {
  return gulp.src(paths.js.src)
    .pipe(gulpConcat('main.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest(paths.js.dest));
}

function pug() {
  return gulp.src(paths.pug.src)
    .pipe(gulpPug({pretty: true}))
    .pipe(gulp.dest(paths.pug.dest));
}

function scss() {
  return gulp.src(paths.scss.src)
    .pipe(gulpSass())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

function watch() {

  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });

  gulp.watch(paths.asset.src, asset);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.js.src, js);
  gulp.watch(paths.pug.src, pug);
  gulp.watch(paths.scss.src, scss);
  gulp.watch(paths.watch).on('change', browserSync.reload);
}


// exports.build = gulp.series();
exports.asset = asset;
exports.html = html;
exports.css = css;
exports.js = js;
exports.pug = pug;
exports.scss = scss;
exports.watch = watch;
exports.default = gulp.series(watch);