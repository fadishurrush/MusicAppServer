const express = require("express");
const songRouter = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === "Song"){
      cb(null, "songs");
    }
    else{
    cb(null, "artworks");
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
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
