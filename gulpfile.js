/*
                                         /$$
                                        | $$
 /$$$$$$/$$$$  /$$   /$$ /$$   /$$  /$$$$$$$  /$$$$$$
| $$_  $$_  $$| $$  | $$|  $$ /$$/ /$$__  $$ /$$__  $$
| $$ \ $$ \ $$| $$  | $$ \  $$$$/ | $$  | $$| $$$$$$$$
| $$ | $$ | $$| $$  | $$  >$$  $$ | $$  | $$| $$_____/
| $$ | $$ | $$|  $$$$$$/ /$$/\  $$|  $$$$$$$|  $$$$$$$
|__/ |__/ |__/ \______/ |__/  \__/ \_______/ \_______/
               MUXDE@Maxime.houyoux

         ░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░
         ░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░
         ░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░
         ░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░
         ░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░
         █░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█
         █░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█
         ░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░
         ░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░
         ░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░
         ░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░
         ░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░
         ░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░
         ░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░
         ░░░░░░░░░░░░░░▀▄▄▄▄▄▄▄▄▄▄▄▄▄█░░
*/

'use strict';

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    notify        = require('gulp-notify'),
    plumber       = require('gulp-plumber'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),
    cssnano       = require('gulp-cssnano'),
    browserSync   = require('browser-sync').create();


//gulp task browser-sync
//*** browser-sync ***
gulp.task('serve', ['scripts', 'styles'], function() {

   browserSync.init({
      proxy: 'localhost'
   });
   gulp.watch('./build/js/**/*.js', ['scripts']);
   gulp.watch('./build/scss/**/*.scss', ['styles']);
   gulp.watch('./dest/**/*.php').on('change', browserSync.reload);

});


//gulp task styles
//*** styles ***
gulp.task('styles', function() {

   return gulp.src('./build/scss/styles.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', function(err) {
         notify({
            title: 'Gros con regarde ton css'
         }).write(err.line + '-- ' + err.message);
         return this.emit('end');
      }))
      .pipe(autoprefixer())
      .pipe(cssnano())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dest/css'))
      .pipe(browserSync.stream());

});


//gulp task scripts
//*** scripts ***
gulp.task('scripts', function() {

   return gulp.src('./build/js/**/*.js')
      .pipe(plumber())
      .pipe(concat('scripts.js'))
      .pipe(uglify().on('error', function(err) {
         notify({
            title: 'Machine ton JS marche pas encore!'
         }).write(err.line + '-- ' + err.message);
         return this.emit('end');
      }))
      .pipe(gulp.dest('./dest/js'))

})

gulp.task('default', ['serve']);
