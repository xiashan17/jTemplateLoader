var gulp = require("gulp");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
    scripts: ['src/**/*.js']
};
gulp.task('scripts',  function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(rename({basename:'jTemplateLoader', suffix: '.min' }))
        .pipe(gulp.dest('build'));
});
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
});


gulp.task('default', ['scripts']);