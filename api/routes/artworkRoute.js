const express = require("express");
const artworkRouter = express.Router();
const { addArtworkURL, getSongArtwork } = require("../Controller/ArtworkController");

artworkRouter.get("/postArtwork", addArtworkURL);
artworkRouter.post("/getArtworkURL", getSongArtwork);

module.exports = artworkRouter;