const fetch = require("node-fetch");
const now = require("performance-now");

const URL = "https://swapi.dev/api/people/";

async function fetchPerson(url) {
  let output;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      output = data;
    });
  return output;
}

async function printNames() {
  let start = now();
  console.log("Before");
  const person1 = await fetchPerson(URL + "1");
  const person2 = await fetchPerson(URL + "2");
  console.log(person1.name);
  console.log(person2.name);
  console.log("After all");
  let end = now();
  //console.log(start.toFixed(3));
  console.log((end - start).toFixed(0) + " Milliseconds");
}

async function printNamesParallel() {
  let start = now();
  console.log("Before");
  const person1 = fetchPerson(URL + "1");
  const person2 = fetchPerson(URL + "2");
  let fetched = await Promise.all([person1, person2]);
  console.log(fetched[0].name);
  console.log(fetched[1].name);
  console.log("After all");
  let end = now();
  //console.log(start.toFixed(3));
  console.log((end - start).toFixed(0) + " Milliseconds");
}

printNames();
//printNamesParallel();
