const crypto = require("crypto");

let makeSecureRandom = (SIZE) => {
  return new Promise((resolve, reject) => {
    require("crypto").randomBytes(SIZE, (err, buffer) => {
      if (err) return reject(new Error("something went wrong"));
      let secureHex = buffer.toString("hex");
      let object = {
        length: SIZE,
        random: secureHex,
      };
      resolve(object);
    });
  });
};

module.exports = makeSecureRandom;
