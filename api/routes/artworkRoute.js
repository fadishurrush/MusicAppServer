const express = require("express");
const artworkRouter = express.Router();
const { addArtworkURL, getSongArtwork } = require("../Controller/ArtworkController");

artworkRouter.post("/postArtworkURL", addArtworkURL);
artworkRouter.get("/getArtworkURL", getSongArtwork);

module.exports = artworkRouter;