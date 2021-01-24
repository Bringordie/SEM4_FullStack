import express, { json } from "express";
import userFacade from "../facades/userFacadeWithDB";
import basicAuth from "../middlewares/basic-auth";
const debug = require("debug")("user-endpoint");
const router = express.Router();
import { ApiError } from "../errors/apiError";
import authMiddleware from "../middlewares/basic-auth";
import app from "../app";

const { graphqlHTTP } = require("express-graphql");
import { buildSchema } from "graphql";
import GameUser from "../interfaces/GameUser";

const USE_AUTHENTICATION = !process.env["SKIP_AUTHENTICATION"];

let facadeInitialized = false;
router.use(async (req, res, next) => {
  if (!facadeInitialized) {
    const db = await app.get("database");
    await userFacade.initDB(db);
  }
  next();
});

const schema = buildSchema(`
   type User {
     name: String
     userName: String
     role: String
   }
   input UserInput {
     name: String
     userName: String!
     password: String!
   }
 
   type Query {
     users : [User]!
     user(userName: String!) : User
   }
 
   type Mutation {
     createUser(input:UserInput): User 
   }
`);

var root = {
  users: async () => {
    const users = await userFacade.getAllUsers();
    const usersDTO = users.map((user) => {
      const { name, userName, role } = user;
      return { name, userName, role };
    });
    return usersDTO;
  },
  user: async ({ userName }: any) => {
    const { name, role } = await userFacade.getUser(userName);
    return { name, role, userName };
  },
  createUser: async (inp: any) => {
    const { input } = inp;
    try {
      const newUser: GameUser = {
        name: input.name,
        userName: input.userName,
        password: input.password,
        role: "user",
      };
      const status = await userFacade.addUser(newUser);
      return status;
    } catch (err) {
      throw err;
    }
  },
};

// if (USE_AUTHENTICATION) {
//   router.use(authMiddleware);
// }

router.use("/", (req: any, res, next) => {
  if (USE_AUTHENTICATION) {
    if (!req.userName) {
      throw new ApiError("Not Authorized", 403);
    }
  }
  next();
});

router.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

module.exports = router;
