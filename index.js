var gm      = require("gm");
var through = require("through2");
var util    = require("gulp-util");

var PluginError = util.PluginError;

const PLUGIN_NAME = "gulp-gm";

module.exports = function (modifier, options) {

	if (!options) {
		options = {};
	}

	var _gm = gm;

  if (options.imageMagick) {
    _gm = gm.subClass({ imageMagick : true });
  }

	return through.obj(function (file, enc, done) {

		var passthrough = through();
		var gmFile = _gm(file.pipe(passthrough), file.path);

		var modifiedGmFile = modifier(gmFile);

		if (modifiedGmFile == null) {
			return done(new PluginError(PLUGIN_NAME, "Modifier callback didn't return anything."));
		}

		modifiedGmFile.toBuffer(function (err, buffer) {
			if (err) {
				return done(new PluginError(PLUGIN_NAME, err));
			} else {
				file.contents = buffer;
				done(null, file);
			}
		});

	});

};