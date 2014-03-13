/*global describe, it, before, beforeEach, after, afterEach */

var assert = require("assert");
var fs     = require("fs");
var gm     = require("gm");
var util   = require("gulp-util");
var File   = util.File;

var gulpGm = require("../index");


it('should work', function (done) {

	var stream = gulpGm(function (gmfile) {
		return gmfile
			.resize(100, 100);
	});

	stream.on("data", function(file) {

		gm(file.contents).size(function (err, features) {
			assert.equal(features.width, 100);
			assert.equal(features.height, 91);
			done();
		});

	});

	var file = new File({
		path : "test/fixtures/wikipedia.png",
		contents : fs.readFileSync("test/fixtures/wikipedia.png")
	});

	stream.write(file);

});


it('should work with ImageMagick', function (done) {

	var stream = gulpGm(function (gmfile) {
		return gmfile
			.resize(100, 100);
	}, {
		imageMagick : true
	});

	stream.on("data", function(file) {

		gm(file.contents).size(function (err, features) {
			assert.equal(features.width, 100);
			assert.equal(features.height, 91);
			done();
		});

	});

	var file = new File({
		path : "test/fixtures/wikipedia.png",
		contents : fs.readFileSync("test/fixtures/wikipedia.png")
	});

	stream.write(file);

});