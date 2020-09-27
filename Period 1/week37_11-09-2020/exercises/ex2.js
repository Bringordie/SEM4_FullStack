const fetch = require("node-fetch");

const getPlanetforFirstSpeciesInFirstMovieForPerson = (id) => {
  let person = {};
  let output = {};
  fetch(`https://swapi.dev/api/people/${id}`)
    .then((res) => res.json())
    .then((data) => {
      person = data;
      output["Name"] = data.name;
      //console.log(data.name);
      fetch(person.films[0])
        .then((res) => res.json())
        .then((data) => {
          output["First Film"] = data.title;
          //console.log(data.title);
          fetch(person.species[0])
            .then((res) => res.json())
            .then((data) => {
              output["First Species"] = data.name;
              //console.log(data.name);
              fetch(person.homeworld)
                .then((res) => res.json())
                .then((data) => {
                  output["Homeworld"] = data.name;
                  //console.log(data.name);
                  console.log(output);
                });
            });
        });
    });
};

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

getPlanetforFirstSpeciesInFirstMovieForPerson(2);
getPlanetforFirstSpeciesInFirstMovieForPersonAsync(1);
