import { SERVER_URL } from "./settings";
import { Base64 } from "js-base64";

ServerFacade = () => {
  async function fetchGameArea() {
    const res = await fetch(`${SERVER_URL}/geoapi/gamearea`).then((res) =>
      res.json()
    );
    return res.coordinates;
  }

  async function isUserInArea(lon, lat) {
    const status = await fetch(
      `${SERVER_URL}/geoapi/isuserinarea/${lon}/${lat}`
    ).then((res) => res.json());
    return status;
  }

  async function getPeopleInRadius(lat, lon, rad, username, password) {
    let headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Base64.encode(username + ":" + password)
    );
    try {
      const url = `${SERVER_URL}/geoapi/findNearbyPlayers/${lon}/${lat}/${rad}`;
      console.log(url);
      const status = await fetch(url, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
      return status;
    } catch (err) {
      return false;
    }
  }

  return {
    fetchGameArea,
    isUserInArea,
    getPeopleInRadius,
  };
};

export default ServerFacade();
