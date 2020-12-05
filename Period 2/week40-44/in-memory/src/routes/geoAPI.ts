import express from "express";
const router = express.Router();
const { gameArea, players } = require("../dummydata/gameData");
const gju = require("geojson-utils");
import IPlayer from "../interfaces/Players";
import IGameArea from "../interfaces/GameArea";
import { getConnectedClient } from "../config/setupDB";
import authMiddleware from "../middlewares/basic-auth";
const debug = require("debug")("user-endpoint");

import UserFacade from "../facades/userFacadeWithDB";
import GameFacade from "../facades/gameFacade";

const USE_AUTHENTICATION = !process.env["SKIP_AUTHENTICATION"];

let dbInitialized = false;

(async function initDb() {
  const client = await getConnectedClient();
  await UserFacade.initDB(client);
  await GameFacade.initDB(client);
  dbInitialized = true;
})();

router.use((req, res, next) => {
  if (dbInitialized) {
    return next();
  }
  return res.json({ info: "DB not ready, try again" });
});

//Just to check this router is up and running
router.get("/", async function (req, res, next) {
  res.json({ msg: "geo API" });
});

/*
 Create a new polygon meant to be used on clients by React Native's MapView which
 requres an object as the one we create below 
 NOTE --> how we swap longitude, latitude values
*/
let polygonForClient: any = {};
polygonForClient.coordinates = gameArea.coordinates[0].map((point: any) => {
  return { latitude: point[1], longitude: point[0] };
});

//Returns a polygon, representing the gameArea
router.get("/gamearea", (req, res) => {
  return res.json(polygonForClient);
});

router.get("/isuserinarea/:lon/:lat", function (req, res, next) {
  try {
    const lon = req.params.lon;
    const lat = req.params.lat;
    const point = { type: "Point", coordinates: [lon, lat] };
    let isInside = gju.pointInPolygon(point, gameArea);
    let result = { status: "", msg: "" };
    result.status = isInside;
    let msg = isInside
      ? "Point was inside the tested polygon"
      : "Point was NOT inside tested polygon";
    result.msg = msg;
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

if (USE_AUTHENTICATION) {
  router.use(authMiddleware);
}

router.get("/findNearbyPlayers/:lon/:lat/:rad", function (req, res, next) {
  try {
    const lon = Number(req.params.lon);
    debug(lon);
    const lat = Number(req.params.lat);
    debug(lat);
    const rad = Number(req.params.rad);
    const point = { type: "Point", coordinates: [lon, lat] };
    let result: Array<IPlayer> = [];
    players.forEach((player: IPlayer) => {
      if (gju.geometryWithinRadius(player.geometry, point, rad)) {
        result.push(player);
      }
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/distanceToUser/:lon/:lat/:username", function (req, res, next) {
  try {
    const { lon, lat, username } = req.params;
    const point = { type: "Point", coordinates: [Number(lon), Number(lat)] };
    console.log(point, username);
    const user = players.find((player: IPlayer) => {
      return player.properties.name === username;
    });
    if (!user) {
      res.status(404);
      return res.json({ msg: "User not found" });
    }
    let distance = gju.pointDistance(point, user.geometry);
    let result = { distance: distance, to: username };
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
