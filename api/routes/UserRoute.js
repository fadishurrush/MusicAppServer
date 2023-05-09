const express = require("express");
const { Login, Register } = require("../Controller/UserController");
const UserRouter = express.Router();

UserRouter.get("/Login",Login)
UserRouter.get("/Register",Register)

module.exports = UserRouter;
