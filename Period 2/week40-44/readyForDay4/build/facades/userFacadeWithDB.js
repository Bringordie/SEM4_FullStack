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
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });
const debug = require("debug")("facade-with-db");
const bcrypt_async_helper_1 = require("../utils/bcrypt-async-helper");
const setupDB_1 = require("../config/setupDB");
let userCollection;
class UserFacade {
    static initDB(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbName = process.env.DB_NAME;
            //debug(`Database ${dbName} about to be setup: ${client}`)
            if (!dbName) {
                throw new Error("Database name not provided");
            }
            try {
                userCollection = yield client.db(dbName).collection("users");
                debug(`userCollection initialized on database '${dbName}'`);
            }
            catch (err) {
                console.error("Could not create connection", err);
            }
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_async_helper_1.bryptAsync(user.password);
            let newUser = Object.assign(Object.assign({}, user), { password: hash });
            const result = yield userCollection.insertOne(newUser);
            return "User was added";
        });
    }
    static deleteUser(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not Implemented");
        });
    }
    //static async getAllUsers(): Promise<Array<IGameUser>> {
    static getAllUsers(proj) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userCollection.find({}, { projection: proj }).toArray();
            return users;
        });
    }
    static getUser(userName, proj) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userCollection.findOne({ userName });
            return user;
            //throw new Error("getUser(..) is not yet Implemented")
        });
    }
    static checkUser(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let userPassword = "";
            console.log("Checking");
            let user;
            user = yield UserFacade.getUser(userName);
            console.log("Found ", user);
            userPassword = user.password;
            const status = yield bcrypt_async_helper_1.bryptCheckAsync(password, userPassword);
            return status;
        });
    }
}
exports.default = UserFacade;
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield setupDB_1.getConnectedClient();
        yield UserFacade.initDB(client);
        yield userCollection.deleteMany({});
        yield UserFacade.addUser({ name: "kim-admin", userName: "kim@b.dk", password: "secret", role: "admin" });
        yield UserFacade.addUser({ name: "ole", userName: "ole@b.dk", password: "secret", role: "user" });
        const all = yield UserFacade.getAllUsers();
        debug(all);
        debug(`Number of users: ${all.length}`);
        //client.close();
        // const projection = {projection:{_id:0, role:0,password:0}}
        // const kim = await UserFacade.getUser("kim@b.dk",projection)
        // debug(kim)
        // try {
        //     let status = await UserFacade.deleteUser("kim@b.dk");
        //     debug(status)
        //     status = await UserFacade.deleteUser("xxxx@b.dk");
        //     debug("Should not get here")
        // } catch (err) {
        //     debug(err.message)
        // }
        // try {
        //     const passwordStatus = await UserFacade.checkUser("kim@b.dk", "secret");
        //     debug("Expects true: ", passwordStatus)
        // } catch (err) {
        //     debug("Should not get here 1", err)
        // }
        // try {
        //     const passwordStatus = await UserFacade.checkUser("kim@b.dk", "xxxx");
        //     debug("Should not get here ", passwordStatus)
        // } catch (err) {
        //     debug("Should get here with failded 2", err)
        // }
        // try {
        //     const passwordStatus = await UserFacade.checkUser("xxxx@b.dk", "secret");
        //     debug("Should not get here")
        // } catch (err) {
        //     debug("hould get here with failded 2", err)
        // }
    });
}
//test();
//# sourceMappingURL=userFacadeWithDB.js.map