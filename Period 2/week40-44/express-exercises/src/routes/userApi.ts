import express from "express";
import userFacade from "../facades/user";
import basicAuth from "../middlewares/basic-auth";
const debug = require("debug")("game-project");
import {ApiError2} from "../errorhandeling/apiError2";

const router = express.Router();

router.post("/", async function (req, res, next) {
  const { error } = userFacade.validateClass(req.body); // result.error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    let newUser = req.body;
    newUser.role = "user"; //Even if a hacker tried to "sneak" in his own role, this is what you get
    const status = await userFacade.addUser(newUser);
    res.json({ status });
  } catch (err) {
    next(err);
  }
});


router.use(basicAuth);

router.get("/:userName", async function (req: any, res, next) {
  try {
    const role = req.role;
    if(role != "admin") {
      throw new ApiError2("Not Authorized", 401, res)
    }
    const user_Name = req.params.userName;
    const user = await userFacade.getUser(user_Name);
    const { name, userName } = user;
    const userDTO = { name, userName };
    res.json(userDTO);
  } catch (err) {
    //debug(err)
    throw new ApiError2(err.message, 404, res)
    next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const users = await userFacade.getAllUsers();
    const usersDTO = users.map((user) => {
      const { name, userName } = user;
      return { name, userName };
    });
    res.json(usersDTO);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userName", async function (req, res, next) {
  try {
    const user_name = req.params.userName;
    const status = await userFacade.deleteUser(user_name);
    res.json({ status });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
