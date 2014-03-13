# [gulp](https://github.com/wearefractal/gulp)-gm [![Build Status](https://drone.io/github.com/scalableminds/gulp-gm/status.png)](https://drone.io/github.com/scalableminds/gulp-gm/latest)

> Image manipulation with [gm](https://github.com/aheckmann/gm)


# Install

Install with [npm](https://npmjs.org/package/gulp-gm)

```
npm install --save-dev gulp-gm
```

### GraphicsMagick or ImageMagick
Make sure GraphicsMagick or ImageMagick is installed on your system and properly set up in your `PATH`.

Ubuntu:

```shell
apt-get install imagemagick
apt-get install graphicsmagick
```

Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
brew install imagemagick
brew install graphicsmagick
```

Windows & others:

[http://www.imagemagick.org/script/binary-releases.php](http://www.imagemagick.org/script/binary-releases.php)

Confirm that ImageMagick is properly set up by executing `convert -help` in a terminal.


## Example

```js
var gulp = require('gulp');
var gm = require('gulp-gm');

gulp.task('default', function () {
  gulp.src('test.png')
    .pipe(gulp(function (gmfile) {
      return gmfile
        .resize(100, 100);
    }))
    .pipe(gulp.dest('dist'));
});
```

## API

### gm(modifier, options)

#### modifier(gmfile, [done])

Type: `Function`

Supply a function that manipulates the image. The first argument will the gm object with all properties. [Read more in the gm documentation](http://aheckmann.github.io/gm/docs.html). If you add a second parameter declaration, your modifier function will be treated asynchronously. Your code will then need to call `done(err, gmfile)`.

```js
gulp.src('test.png')
  .pipe(gulp(function (gmfile, done) {
    gmfile.size(function (err, features) {

      done(null, gmfile.resize(
        features.width * .5,
        features.height * .5
      ));

    });
  }))
  .pipe(gulp.dest('dist'));
```


#### options.imageMagick

Type: `Boolean`
Default value: `false`

Set to `true` when using ImageMagick instead of GraphicsMagick.

