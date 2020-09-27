const http = require("http");
const osInfo = require("./day2_os-info");

//DosDetector code here
const DosDetector = require("./dosDetector");
let instance = new DosDetector(5000);
instance.on("Possible DDOS Attack", (arg) => {
  console.log("Possible DDOS-Attack detected on URL:" + arg.url);
  console.log("Time between calls was: " + arg.totalTimeBetweenCalls);
});

const server = http.createServer((req, res) => {
  if (req.url !== "/favicon.ico") {
    instance.addUrl(req.url);
  }
  if (req.url === "/api/os-info") {
    res.write(JSON.stringify({ osInfo }));
    return res.end();
  } else if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<h2>Simple node HTTP server demo</h2>
      <p>Exposes this endpoint <code>/api/os-info</code></p>
    `);
    return res.end();
  }
});
server.on("connection", (sock) => {
  // You can get the client-IP in here, using sock.remoteAddress)
});
server.listen(3000);
console.log("listening on 3000");
