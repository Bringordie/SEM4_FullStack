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
const express_1 = __importDefault(require("express"));
const gameFacade_1 = __importDefault(require("../facades/gameFacade"));
const router = express_1.default.Router();
const setupDB_1 = require("../config/setupDB");
const userFacadeWithDB_1 = __importDefault(require("../facades/userFacadeWithDB"));
const gameFacade_2 = __importDefault(require("../facades/gameFacade"));
let dbInitialized = false;
(function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield setupDB_1.getConnectedClient();
        yield userFacadeWithDB_1.default.initDB(client);
        yield gameFacade_2.default.initDB(client);
        dbInitialized = true;
    });
})();
router.use((req, res, next) => {
    if (dbInitialized) {
        return next();
    }
    return res.json({ "info": "DB not ready, try again" });
});
//Just to check this router is up and running
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({ msg: "game API" });
    });
});
router.post('/nearbyplayers', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Read the exercise and check what must be sent with the request. Grab this information from the request body, and 
            //call the method (the skeleton is already there) nearbyPlayers(....) in the gameFacade and send back the result to the client
            const response = yield gameFacade_1.default.nearbyPlayers(req.body.userName, req.body.password, Number(req.body.lon), Number(req.body.lat), Number(req.body.distance));
            return res.json(response);
        }
        catch (err) {
            next(err);
        }
    });
});
router.post('/getPostIfReached', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        throw new Error("Not yet implemented");
    });
});
module.exports = router;
//# sourceMappingURL=gameAPI.js.map