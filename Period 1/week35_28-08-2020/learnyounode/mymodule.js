var fs = require("fs");
var path = require("path");

module.exports = function getFiles(dirInput, fileNameInput, callback) {
  fs.readdir(dirInput, function (err, list) {
    if (err) return callback(err);

    list = list.filter(function (file) {
      return path.extname(file) === "." + fileNameInput;
    });

    callback(null, list);
  });
};
