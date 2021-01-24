import path from "path";
require("dotenv").config({ path: path.join(process.cwd(), ".env") });
import { expect } from "chai";
import { Server } from "http";
import fetch from "node-fetch";
import { MongoClient } from "mongodb";
import { bryptAsync } from "../src/utils/bcrypt-async-helper";
import { getConnectedClient } from "../src/config/setupDB";
const { gameArea, players } = require("../src/dummydata/gameData");

import {
  positionCreator,
  getLatitudeInside,
  getLatitudeOutside,
} from "../src/utils/geoUtils";
import {
  USER_COLLECTION_NAME,
  POSITION_COLLECTION_NAME,
} from "../src/config/collectionNames";

let server: Server;
const TEST_PORT = "7777";
let client: MongoClient;
const DISTANCE_TO_SEARCH = 100;

describe("Verify /geoapi/", () => {
  let URL: string;
  let usersCollection: any;
  let positionsCollection: any;

  //IMPORTANT --> this does now work with Mocha for ARROW-functions
  before(async function () {
    //@ts-ignore
    this.timeout(Number(process.env["MOCHA_TIMEOUT"]));

    process.env["PORT"] = TEST_PORT;
    process.env["SKIP_AUTHENTICATION"] = "1";
    process.env["DB_NAME"] = "semester_case_test";

    const client = await getConnectedClient();
    const db = client.db(process.env.DB_NAME);
    usersCollection = db.collection(USER_COLLECTION_NAME);
    positionsCollection = db.collection(POSITION_COLLECTION_NAME);

    server = require("../src/app").server;
    URL = `http://localhost:${process.env.PORT}`;
  });

  beforeEach(async () => {
    await usersCollection.deleteMany({});
    const secretHashed = await bryptAsync("secret");
    const team1 = {
      name: "Team1",
      userName: "t1",
      password: secretHashed,
      role: "team",
    };
    const team2 = {
      name: "Team2",
      userName: "t2",
      password: secretHashed,
      role: "team",
    };
    const team3 = {
      name: "Team3",
      userName: "t3",
      password: secretHashed,
      role: "team",
    };

    const status = await usersCollection.insertMany([team1, team2, team3]);

    await positionsCollection.deleteMany({});
    await positionsCollection.createIndex(
      { lastUpdated: 1 },
      { expireAfterSeconds: 30 }
    );
    await positionsCollection.createIndex({ location: "2dsphere" });
    const positions = [
      positionCreator(12.48, 55.77, team1.userName, team1.name, true),
      //TODO --> Change latitude below, to a value INSIDE the radius given by DISTANCE_TO_SEARC, and the position of team1
      positionCreator(
        12.48,
        getLatitudeInside(55.77, DISTANCE_TO_SEARCH),
        team2.userName,
        team2.name,
        true
      ),
      //TODO --> Change latitude below, to a value OUTSIDE the radius given by DISTANCE_TO_SEARC, and the position of team1
      positionCreator(
        12.48,
        getLatitudeOutside(55.77, DISTANCE_TO_SEARCH),
        team3.userName,
        team3.name,
        true
      ),
    ];
    const locations = await positionsCollection.insertMany(positions);
  });

  after(async () => {});

  it("FindNearbyPlayers should find 1 result", async function () {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const result = await fetch(
      `${URL}/geoapi/findNearbyPlayers/12.561578750610352/55.779758908094266/100`,
      config
    ).then((r) => r.json());
    expect(result.length).to.be.equal(1);
  });

  it("FindNearbyPlayers should find 0 result", async function () {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const result = await fetch(
      `${URL}/geoapi/findNearbyPlayers/52.561578750610352/80.779758908094266/100`,
      config
    ).then((r) => r.json());
    expect(result.length).to.be.equal(0);
  });

  it("isuserinarea should return true", async function () {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const result = await fetch(
      `${URL}/geoapi/isuserinarea/12.561578750610352/55.779758908094266/`,
      config
    ).then((r) => r.json());
    expect(result.status).to.be.equal(true);
    expect(result.msg).to.be.equal("Point was inside the tested polygon");
  });

  it("isuserinarea should return false", async function () {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const result = await fetch(
      `${URL}/geoapi/isuserinarea/12/55`,
      config
    ).then((r) => r.json());
    expect(result.status).to.be.equal(false);
    expect(result.msg).to.be.equal("Point was NOT inside tested polygon");
  });

  it("distanceToUser should return not found", async function () {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const result = await fetch(
      `${URL}/geoapi/distanceToUser/12/55/unknownname`,
      config
    ).then((r) => r.json());
    expect(result.msg).to.be.equal("User not found");
  });

  it("distanceToUser should return a distance", async function () {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const result = await fetch(
      `${URL}/geoapi/distanceToUser/12/55/Team1-inside`,
      config
    ).then((r) => r.json());
    expect(result.distance).to.be.equal(94538.1000147354);
    expect(result.to).to.be.equal("Team1-inside");
  });
});
