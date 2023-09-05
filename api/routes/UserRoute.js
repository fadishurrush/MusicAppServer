const express = require("express");
const { Login, Register, setFav, getFav, getHistory, addHistory, addPlaylist, getPlaylists } = require("../Controller/UserController");
const UserRouter = express.Router();

UserRouter.get("/Login",Login)
UserRouter.post("/Register",Register)
UserRouter.patch("/setFav",setFav)
UserRouter.get("/getFav",getFav)
UserRouter.get("/getHistory",getHistory)
UserRouter.post("/addHistory",addHistory)
UserRouter.get("/getPlaylists",getPlaylists)
UserRouter.post("/addPlaylists",addPlaylist)


module.exports = UserRouter;
