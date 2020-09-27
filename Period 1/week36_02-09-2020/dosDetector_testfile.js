const DosDetector = require("./dosDetector");

let instance = new DosDetector(2000);

instance.on("Possible DDOS Attack", (arg) => {
  console.log("Possible DDOS-Attack detected on URL:" + arg.url);
  console.log("Time between calls was: " + arg.totalTimeBetweenCalls);
});

//First call
let url = instance.addUrl("test.url");

//Calls under the time Limit
setTimeout(() => instance.addUrl("test.url"), 250);
setTimeout(() => instance.addUrl("test.url"), 500);
setTimeout(() => instance.addUrl("test.url"), 1000);

//Call after time limit
setTimeout(() => instance.addUrl("test.url"), 5000);

//Call under time limit again
setTimeout(() => instance.addUrl("test.url"), 5500);
setTimeout(() => instance.addUrl("test.url"), 6500);
