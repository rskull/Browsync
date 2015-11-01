/*
 * Plugins
*/

import fs from 'fs'
import del from 'del'
import plumber from 'gulp-plumber'
import runSequence from 'run-sequence'
import htmlmin from 'html-minifier'
import cssmin from 'cssmin'
import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import replace from 'gulp-replace-task'
import bookmarkify from 'gulp-bookmarkify'
import eslint from 'gulp-eslint'

/**
 * Tasks
 */

gulp.task('build', function (callback) {
    runSequence(
        'eslint',
        'build.js01',
        'build.js02',
        'build.html',
        'clean',
        callback
    );
});

gulp.task('eslint', () => {
    return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('build.js01', () => {
    return gulp.src('src/js/browsync.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build.js02', () => {
    return gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(replace({
            patterns: [
                {
                    match: 'style',
                    replacement: cssmin(fs.readFileSync('./src/css/style.css', 'utf8'))
                },
                {
                    match: 'html',
                    replacement: htmlmin.minify(fs.readFileSync('./src/view/browsync.html', 'utf8'), {collapseWhitespace: true})
                },
                {
                    match: 'script',
                    replacement: fs.readFileSync('./dist/browsync.js', 'utf8')
                }
            ]
        }))
        .pipe(bookmarkify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build.html', () => {
    return gulp.src('src/view/index.html')
        .pipe(plumber())
        .pipe(replace({
            patterns: [
                {
                    match: 'script',
                    replacement: fs.readFileSync('./dist/main.js', 'utf8')
                }
            ]
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
    del(['dist']);
});

gulp.task('watch', () => {
    gulp.watch('src/**/**', ['build']);
});

gulp.task('default', ['watch']); 
