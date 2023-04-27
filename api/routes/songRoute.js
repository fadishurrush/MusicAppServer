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
  // getSongArtwork
} = require("../Controller/SongController");

songRouter.post("/postSong",upload.fields( [{name :"Song", maxCount :1},{name :"artwork", maxCount :1}]),addSong);

songRouter.get("/getSong", getSong);
songRouter.get("/getSongURL", getSongURL);
// songRouter.get("/getSongArtwork", getSongArtwork);
songRouter.delete("/deleteSong", deleteSong);
songRouter.patch("/updateSong", updateSong);
songRouter.get("/getAllSongs", getAllSongs);

module.exports = songRouter;
