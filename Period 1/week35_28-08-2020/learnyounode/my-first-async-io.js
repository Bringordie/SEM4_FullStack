const fs = require("fs");
let newLineCount = 0;
let file_info = process.argv[2];

fs.readFile(file_info, (err, data) => {
  if (err) throw err;
  var lines = data.toString();
  for (i = 0; i < lines.length; i++) {
    if (lines[i] == "\n") {
      newLineCount += 1;
    }
  }
  console.log(newLineCount);
});
