const express = require("express");
const { Login, Register, setFav, getFav } = require("../Controller/UserController");
const UserRouter = express.Router();

UserRouter.get("/Login",Login)
UserRouter.post("/Register",Register)
UserRouter.patch("/setFav",setFav)
UserRouter.get("/getFav",getFav)


module.exports = UserRouter;
