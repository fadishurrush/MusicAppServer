const express = require("express");
const songRouter = express.Router();
const {
  addSong,
  getSong,
  deleteSong,
  updateSong,
  getAllSongs,
  getSongURL,
  addSongURL,
} = require("../Controller/SongController");

songRouter.post("/postSong",addSong);
songRouter.post("/postSongURL",addSongURL);

songRouter.get("/getSong", getSong);
songRouter.get("/getSongURL", getSongURL);
songRouter.get("/getSongURL", getSongURL);
songRouter.delete("/deleteSong", deleteSong);
songRouter.patch("/updateSong", updateSong);
songRouter.get("/getAllSongs", getAllSongs);

module.exports = songRouter;
