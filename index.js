var through = require('through2'),
    gutil = require('gulp-util'),
    execProc = require('child_process').exec;

// plugin level function (dealing with files)
function gitModified() {
  // creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    var _this = this;

    if (file.isNull()) {
      this.emit('error', new gutil.PluginError('empty file not supported!'));
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('streaming not supported!'));
      return cb();
    }

    execProc('git status --porcelain ' + file.path, function(err, stdout, stderr) {
      if (err) {
        _this.emit('error', new gutil.PluginError(err));
      } else {
        // this file does have changes: add/modify/remove...
        if (stdout.length > 0) {
          // the standard GIT output(beware of the whitespace before "M"):
          // A app/js/abc.js
          //  M app/gulpfile.js
          // `M` means the file has been modified
          if (stdout.trim().split(" ")[0] === "M") {
            _this.push(file);
          }
        }
      }

      cb();
    });
  });
}

// exporting the plugin main function
module.exports = gitModified;