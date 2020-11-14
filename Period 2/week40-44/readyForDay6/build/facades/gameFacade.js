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
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });
const apiError_1 = require("../errors/apiError");
const userFacadeWithDB_1 = __importDefault(require("./userFacadeWithDB"));
const collectionNames_1 = require("../config/collectionNames");
const debug = require("debug")("game-facade");
let positionCollection;
let postCollection;
const EXPIRES_AFTER = 30;
class GameFacade {
    static isDbReady() {
        if (!GameFacade.dbIsReady) {
            throw new Error(`######## initDB MUST be called BEFORE using this facade ########`);
        }
    }
    static initDB(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbName = process.env.DB_NAME;
            debug(`Database ${dbName} about to be setup: ${client}`);
            if (!dbName) {
                throw new Error("Database name not provided");
            }
            //Setup the Facade
            yield userFacadeWithDB_1.default.initDB(client);
            try {
                positionCollection = yield client.db(dbName).collection(collectionNames_1.POSITION_COLLECTION_NAME);
                debug(`positionCollection initialized on database '${dbName}'`);
            }
            catch (err) {
                console.error("Could not create connection", err);
            }
            //TODO
            //1) Create expiresAfterSeconds index on lastUpdated
            //2) Create 2dsphere index on location
            //TODO uncomment if you plan to do this part of the exercise
            ///postCollection = client.db(dbName).collection(POST_COLLECTION_NAME);
            //await postCollection.createIndex({ location: "2dsphere" })
            GameFacade.dbIsReady = true;
        });
    }
    static nearbyPlayers(userName, password, longitude, latitude, distance) {
        return __awaiter(this, void 0, void 0, function* () {
            GameFacade.isDbReady();
            let user;
            try {
                //Step-1. Find the user, and if found continue
                // Use relevant methods in the user facad>
                yield userFacadeWithDB_1.default.checkUser(userName, password);
                user = yield userFacadeWithDB_1.default.getUser(userName);
            }
            catch (err) {
                throw new apiError_1.ApiError("wrong username or password", 403);
            }
            try {
                //If loggedin update (or create if this is the first login) his position
                const point = { type: "Point", coordinates: [longitude, latitude] };
                const date = new Date();
                //Todo
                /*It's important you know what to do her. Remember a document for this user does
                  not neccesarily exist. If not, you must create it, in not found (see what you can do wit upsert)
                  Also remember to set a new timeStamp (use the date created above), since this document should only live for a
                  short time */
                const found = yield positionCollection.findOneAndUpdate({ userName: userName }, //Add what we are searching for (the userName in a Position Document)
                { $set: { userName: userName, name: user.name, lastUpdated: date, location: point } }, // Add what needs to be added here, remember the document might NOT exist yet
                //upsert opretter et nyt dokument hvis der ikke eksistere et i forvejen. ReturnOriginal:false gør så vi får returned det opdaterede document i stedet for det originale
                { upsert: true, returnOriginal: false } // Figure out why you probably need to set both of these
                );
                /* TODO
                   By now we have updated (or created) the callers position-document
                   Next step is to see if we can find any nearby players, friends or whatever you call them
                   */
                const nearbyPlayers = yield GameFacade.findNearbyPlayers(userName, point, distance);
                //If anyone found,  format acording to requirements
                const formatted = nearbyPlayers.map((player) => {
                    return {
                        userName: player.userName,
                        lat: player.location.coordinates[0],
                        lon: player.location.coordinates[1],
                        name: player.name
                        // Complete this, using the requirements
                    };
                });
                return formatted;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static findNearbyPlayers(clientUserName, point, distance) {
        return __awaiter(this, void 0, void 0, function* () {
            GameFacade.isDbReady();
            try {
                const found = yield positionCollection.find({
                    location: { $near: {
                            $geometry: point,
                            $maxDistance: distance
                        }
                    },
                    userName: { $ne: clientUserName }
                });
                return found.toArray();
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getPostIfReached(postId, lat, lon) {
        return __awaiter(this, void 0, void 0, function* () {
            GameFacade.isDbReady();
            try {
                const post = yield postCollection.findOne({
                    _id: postId,
                    location: {
                        $near: {}
                        // Todo: Complete this
                    }
                });
                if (post === null) {
                    throw new apiError_1.ApiError("Post not reached", 400);
                }
                return { postId: post._id, task: post.task.text, isUrl: post.task.isUrl };
            }
            catch (err) {
                throw err;
            }
        });
    }
    //You can use this if you like, to add new post's via the facade
    static addPost(name, taskTxt, isURL, taskSolution, lon, lat) {
        return __awaiter(this, void 0, void 0, function* () {
            GameFacade.isDbReady();
            const position = { type: "Point", coordinates: [lon, lat] };
            const status = yield postCollection.insertOne({
                _id: name,
                task: { text: taskTxt, isURL },
                taskSolution,
                location: {
                    type: "Point",
                    coordinates: [lon, lat]
                }
            });
            const newPost = status.ops;
            return newPost;
        });
    }
}
exports.default = GameFacade;
GameFacade.DIST_TO_CENTER = 15;
GameFacade.dbIsReady = false;
//# sourceMappingURL=gameFacade.js.map