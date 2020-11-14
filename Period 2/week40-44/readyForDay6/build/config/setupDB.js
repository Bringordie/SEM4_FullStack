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
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.join(process.cwd(), '.env') });
const debug = require("debug")("db-setup");
const mongodb_1 = require("mongodb");
const connection = process.env.CONNECTION || "";
let client = new mongodb_1.MongoClient(connection, { useNewUrlParser: true, useUnifiedTopology: true });
function getConnectedClient() {
    return __awaiter(this, void 0, void 0, function* () {
        if (client && client.isConnected()) {
            return client;
        }
        debug("--------- Connecting (You should only see this ONCE)  ------------");
        client = yield client.connect();
        return client;
    });
}
exports.getConnectedClient = getConnectedClient;
function closeConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (client && client.isConnected()) {
            yield client.close();
            debug("--------- Connection Closed ---------");
        }
    });
}
exports.closeConnection = closeConnection;
//# sourceMappingURL=setupDB.js.map