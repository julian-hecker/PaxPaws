// Include Plugins
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpImagemin = require('gulp-imagemin');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpHtmlmin = require('gulp-htmlmin');
const gulpUglify = require('gulp-uglify');

const paths = {
  asset: {
    src: ['src/assets/**/*.*'],
    dest: 'dist/assets/'
  },
  html: {
    src: 'src/html/*.html',
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
  scss: {
    src: 'src/scss/*.+(scss|sass)',
    dest: 'src/css/'
  },
};

function clean() {
  return del([
    'dist/**/*'
  ])
}

function asset(){
  return gulp.src(paths.asset.src)
    .pipe(gulpImagemin())
    .pipe(gulp.dest(paths.asset.dest))
}

function html() {
  return gulp.src(paths.html.src)
    .pipe(gulpHtmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest));
}

function css() {
  return gulp.src(paths.css.src)
    .pipe(gulpPostcss( [autoprefixer( {remove: false} ), cssnano()] ))
    .pipe(gulp.dest(paths.css.dest));
}

function js() {
  return gulp.src(paths.js.src)
    .pipe(gulpConcat('main.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest(paths.js.dest));
}

function scss() {
  return gulp.src(paths.scss.src)
    .pipe(gulpSass())
    .pipe(gulp.dest(paths.scss.dest))
}

function compileCss() {
  return gulp.src(paths.scss.src)
    .pipe(gulpSass())
    .pipe(gulpPostcss([autoprefixer( {remove: false} )]))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(gulpRename(function(path) {
      path.extname = '.min.css';
    }))
    .pipe(gulpPostcss([cssnano()]))
    .pipe(gulp.dest(paths.css.dest));
}

function watch() {
  gulp.watch(paths.asset.src, asset);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.js.src, js);
  gulp.watch('src/scss/**/*.+(scss|sass)', compileCss);
}


exports.clean = clean
exports.asset = asset;
exports.html = html;
exports.js = js;
exports.compileCss = compileCss;
exports.watch = watch;

exports.build = gulp.series(clean, compileCss, html, js, asset);
exports.default = gulp.series(clean, compileCss, html, js, asset, watch);
