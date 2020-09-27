var http = require("http");
var url = process.argv[2];

http.get(url, (response) => {
  response.on("data", function (data) {
    console.log(data.toString());
  });
});
