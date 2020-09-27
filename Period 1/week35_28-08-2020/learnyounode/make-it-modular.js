var myModule = require("./mymodule.js");
var dirInput = process.argv[2];
var fileNameInput = process.argv[3];

myModule(dirInput, fileNameInput, function (err, list) {
  if (err) return console.error("There was an error:", err);

  list.forEach(function (file) {
    console.log(file);
  });
});
