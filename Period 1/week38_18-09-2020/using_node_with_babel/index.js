import fetch from "node-fetch";
import promise_any from "core-js/proposals/promise-any";

const getPlanetforFirstSpeciesInFirstMovieForPersonAsync = async (id) => {
  const output = {};
  try {
    const person = await fetch(
      `https://swapi.dev/api/people/${id}`
    ).then((res) => res.json());
    output["Name"] = person.name;
    if (person.films.length == 0) {
      output["First film"] = "unknown";
    } else {
      const film = await fetch(person.films[0]).then((res) => res.json());
      output["First film"] = film.title;
    }
    if (person.species.length == 0) {
      ("unknown");
      output["First specie"] = "unknown";
    } else {
      const species = await fetch(person.species[0]).then((res) => res.json());
      output["First specie"] = species.name;
    }
    const homeworld = await fetch(person.homeworld).then((res) => res.json());
    output["Homeworld for specie"] = homeworld.name;
  } catch (err) {
    console.error(err);
  }
  console.log(output);
};

// Promise.any
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Fetch
getPlanetforFirstSpeciesInFirstMovieForPersonAsync(2);

// Promise.all
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

const secureRandoms = [
  makeSecureRandom(48),
  makeSecureRandom(40),
  makeSecureRandom(32),
  makeSecureRandom(24),
  makeSecureRandom(16),
  makeSecureRandom(8),
];

function forEachAssignmentB(list_num) {
  let output = {
    title: "6 Secure Randoms",
    randoms: [],
  };
  list_num.forEach((number) => {
    output.randoms.push(number);
  });
  console.log(output);
  //return output;
}

Promise.all(secureRandoms)
  .then((res) => forEachAssignmentB(res))
  .catch((e) => console.log(e));
