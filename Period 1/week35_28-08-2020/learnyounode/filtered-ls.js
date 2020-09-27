var fs = require("fs");
var path = require("path");

var dirInput = process.argv[2];
var fileNameInput = process.argv[3];

function getFiles(dirInput, fileNameInput, callback) {
  fs.readdir(dirInput, function (err, list) {
    if (err) return callback(err);

    list = list.filter(function (file) {
      return path.extname(file) === "." + fileNameInput;
    });

    callback(null, list);
  });
}

getFiles(dirInput, fileNameInput, function (err, list) {
  if (err) return console.error("There was an error:", err);

  list.forEach(function (file) {
    console.log(file);
  });
});
