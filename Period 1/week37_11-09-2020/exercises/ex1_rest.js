const makeSecureRandom = require("./ex1.js");
const http = require("http");

function forEachAssignmentB(list_num) {
  let output = {
    title: "6 Secure Randoms",
    randoms: [],
  };
  list_num.forEach((number) => {
    output.randoms.push(number);
  });
  return output;
}

const server = http.createServer((req, res) => {
  if (req.url === "/api/securerandoms") {
    const getSecureRandoms = async () => {
      let size = [48, 40, 32, 24, 16, 8];
      let output = [];
      size.forEach((element) => output.push(makeSecureRandom(element)));
      const promises = await Promise.all(output);
      res.write(JSON.stringify(forEachAssignmentB(promises)));
      return res.end();
    };

    getSecureRandoms();
  } else if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<h2>Simple node HTTP server demo</h2>
        <p>Exposes this endpoint <code>/api/securerandoms</code></p>
      `);
    return res.end();
  }
});
server.on("connection", (sock) => {
  // You can get the client-IP in here, using sock.remoteAddress)
});
server.listen(3000);
console.log("listening on 3000");
