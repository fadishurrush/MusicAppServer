const express = require("express");
const songRouter = express.Router();
const {
  addSong,
  getSong,
  deleteSong,
  updateSong,
  getAllSongs,
} = require("../Controller/SongController");

songRouter.post("/postSong", addSong);

songRouter.get("/getSong", getSong);
songRouter.delete("/deleteSong", deleteSong);
songRouter.patch("/updateSong", updateSong);
songRouter.get("/getAllSongs", getAllSongs);

module.exports = songRouter;
