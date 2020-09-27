const fs = require("fs");
let newLineCount = 0;
let file_info = fs.readFileSync(process.argv[2]);

function hasNextLine(file) {
  var lines = file.toString();
  for (i = 0; i < lines.length; i++) {
    if (lines[i] == "\n") {
      newLineCount += 1;
    }
  }
  console.log(newLineCount);
}

hasNextLine(file_info);
//hasNextLine("This is a test" + "\n" + "\n");
