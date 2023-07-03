const express = require("express");
const { Login, Register, setFav } = require("../Controller/UserController");
const UserRouter = express.Router();

UserRouter.get("/Login",Login)
UserRouter.post("/Register",Register)
UserRouter.patch("/setFav",setFav)

module.exports = UserRouter;
