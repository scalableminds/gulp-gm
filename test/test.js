/*global describe, it, before, beforeEach, after, afterEach */

var assert = require("assert");
var fs     = require("fs");
var gm     = require("gm");
var util   = require("gulp-util");
var File   = util.File;

var gulpGm = require("../index");


var checkImageSize = function (stream, done, sizes) {

	if (!sizes) {
		sizes = [ 100, 91 ];
	}

	stream.on("data", function(file) {

		gm(file.contents).size(function (err, features) {
			assert.equal(features.width, sizes[0]);
			assert.equal(features.height, sizes[1]);
			done();
		});

	});

	var file = new File({
		path : "test/fixtures/wikipedia.png",
		contents : fs.readFileSync("test/fixtures/wikipedia.png")
	});

	stream.write(file);

};


it('should work', function (done) {

	var stream = gulpGm(function (gmfile) {
		return gmfile
			.resize(100, 100);
	});

	checkImageSize(stream, done);

});


it('should work with ImageMagick', function (done) {

	var stream = gulpGm(function (gmfile) {
		return gmfile
			.resize(100, 100);
	}, {
		imageMagick : true
	});

	checkImageSize(stream, done);

});

it('should work async', function (done) {

	var stream = gulpGm(function (gmfile, done) {

		process.nextTick(function () {
			done(null, gmfile.resize(100, 100));
		});

	});

	checkImageSize(stream, done);

});


it('should work with size checking', function (done) {

	var stream = gulpGm(function (gmfile, done) {

		gmfile.size(function (err, features) {
			assert.equal(features.width, 500);
			assert.equal(features.height, 456);
			done(null, gmfile.resize(
				features.width * 0.5,
				features.height * 0.5));
		});

	});

	checkImageSize(stream, done, [ 250, 228 ]);

});