var gulp     = require("gulp");
var mocha    = require("gulp-mocha");
var jshint   = require("gulp-jshint");
var stylish  = require("jshint-stylish");


gulp.task("jshint", function () {
  gulp.src(["gulpfile.js", "index.js", "test/*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task("mocha", function () {
  return gulp.src("test/test.js")
    .pipe(mocha({ reporter: "spec" }));
});


gulp.task("test", ["jshint", "mocha"]);