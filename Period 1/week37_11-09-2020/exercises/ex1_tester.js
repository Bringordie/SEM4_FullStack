const makeSecureRandom = require("./ex1");
const crypto = require("crypto");

function forEachAssignmentB(list_num) {
  let output = {
    title: "6 Secure Randoms",
    randoms: [],
  };
  list_num.forEach((number) => {
    output.randoms.push(number);
  });
  //console.log(`Assignment A: ${JSON.stringify(output)}`);
  console.log(output);
  //return output;
}

const assignment_A = () => {
  const object1 = {
    title: "6 Secure Randoms",
    randoms: [],
  };
  let SIZE = 48;
  crypto.randomBytes(SIZE, function (err, buffer) {
    let secureHex = buffer.toString("hex");
    hex = {
      length: SIZE,
      // random: `A string with ${secureHex.length} random hex-characters`,
      random: secureHex,
    };
    SIZE = 40;
    object1.randoms.push(hex);
    crypto.randomBytes(SIZE, function (err, buffer) {
      let secureHex = buffer.toString("hex");
      hex = {
        length: SIZE,
        // random: `A string with ${secureHex.length} random hex-characters`,
        random: secureHex,
      };
      SIZE = 32;
      object1.randoms.push(hex);
      crypto.randomBytes(SIZE, function (err, buffer) {
        let secureHex = buffer.toString("hex");
        hex = {
          length: SIZE,
          // random: `A string with ${secureHex.length} random hex-characters`,
          random: secureHex,
        };
        object1.randoms.push(hex);
        console.log(object1);
      });
    });
  });
};

const assignment_B = async () => {
  let size = [48, 40, 32, 24, 16, 8];
  const p1 = makeSecureRandom(size[0]);
  const p2 = makeSecureRandom(size[1]);
  const p3 = makeSecureRandom(size[2]);
  const p4 = makeSecureRandom(size[3]);
  const p5 = makeSecureRandom(size[4]);
  const p6 = makeSecureRandom(size[5]);
  const promises = [p1, p2, p3, p4, p5, p6];
  await Promise.all(promises)
    .then((r) => forEachAssignmentB(r))
    .catch((e) => console.log(e));
};

assignment_A();
assignment_B();
