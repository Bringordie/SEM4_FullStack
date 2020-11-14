"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.join(process.cwd(), '.env') });
const mongo = __importStar(require("mongodb"));
const bcrypt_async_helper_1 = require("./bcrypt-async-helper");
const debug = require("debug")("test-users");
const MongoClient = mongo.MongoClient;
const geoUtils_1 = require("./geoUtils");
const collectionNames_1 = require("../config/collectionNames");
const setupDB_1 = require("../config/setupDB");
(function makeTestData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield setupDB_1.getConnectedClient();
            const db = client.db(process.env.DB_NAME);
            const usersCollection = db.collection(collectionNames_1.USER_COLLECTION_NAME);
            yield usersCollection.deleteMany({});
            yield usersCollection.createIndex({ userName: 1 }, { unique: true });
            const secretHashed = yield bcrypt_async_helper_1.bryptAsync("secret");
            const team1 = { name: "Team1", userName: "t1", password: secretHashed, role: "team" };
            const team2 = { name: "Team2", userName: "t2", password: secretHashed, role: "team" };
            const team3 = { name: "Team3", userName: "t3", password: secretHashed, role: "team" };
            const status = yield usersCollection.insertMany([team1, team2, team3]);
            const positionsCollection = db.collection(collectionNames_1.POSITION_COLLECTION_NAME);
            yield positionsCollection.deleteMany({});
            yield positionsCollection.createIndex({ "lastUpdated": 1 }, { expireAfterSeconds: 30 });
            yield positionsCollection.createIndex({ location: "2dsphere" });
            const positions = [
                geoUtils_1.positionCreator(12.48, 55.77, team1.userName, team1.name, true),
                geoUtils_1.positionCreator(12.49, 55.77, team2.userName, team2.name, true),
                geoUtils_1.positionCreator(12.50, 55.77, team3.userName, team3.name, true),
                geoUtils_1.positionCreator(12.51, 55.77, "xxx", "yyy", false),
            ];
            const locations = yield positionsCollection.insertMany(positions);
            const postCollection = db.collection(collectionNames_1.POST_COLLECTION_NAME);
            yield postCollection.deleteMany({});
            const posts = yield postCollection.insertMany([{
                    _id: "Post1",
                    task: { text: "1+1", isUrl: false },
                    taskSolution: "2",
                    location: {
                        type: "Point",
                        coordinates: [12.49, 55.77]
                    }
                },
                {
                    _id: "Post2",
                    task: { text: "4-4", isUrl: false },
                    taskSolution: "0",
                    location: {
                        type: "Point",
                        coordinates: [12.4955, 55.774]
                    }
                }]);
            debug(`Inserted ${posts.insertedCount} test Posts`);
            debug(`Inserted ${status.insertedCount} test users`);
            debug(`Inserted ${locations.insertedCount} test Location`);
            debug(`NEVER, NEVER, NEVER run this on a production database`);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setupDB_1.closeConnection();
        }
    });
})();
//# sourceMappingURL=makeTestLocationData.js.map