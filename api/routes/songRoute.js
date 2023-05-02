const express = require("express");
const songRouter = express.Router();
const {
  addSong,
  getSong,
  deleteSong,
  updateSong,
  getAllSongs,
  getSongURL,
  addArtworkURL,
  getSongArtwork,
  addSongURL,
} = require("../Controller/SongController");

songRouter.post("/postSong",addSong);
songRouter.post("/postArtworkURL",addArtworkURL);
songRouter.post("/postSongURL",addSongURL);

songRouter.get("/getSong", getSong);
songRouter.get("/getSongURL", getSongURL);
songRouter.get("/getArtworkURL", getSongArtwork);
songRouter.get("/getSongURL", getSongURL);
songRouter.delete("/deleteSong", deleteSong);
songRouter.patch("/updateSong", updateSong);
songRouter.get("/getAllSongs", getAllSongs);

module.exports = songRouter;
