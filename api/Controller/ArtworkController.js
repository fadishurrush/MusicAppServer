const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const fs = require("fs");
const artworkModule = require("../modules/artwork.module");
const MongoClient = require("mongodb").MongoClient;
const multer = require("multer");
const clint = new MongoClient(
  "mongodb+srv://Devil8Pro:FadixDevil_1402@musicapp.yjfs580.mongodb.net/?retryWrites=true&w=majority"
);
const db = clint.db();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

module.exports = {
  addArtworkURL: (req, res) => {
    upload.single("artwork")(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Upload Request Validation Failed", error: err });
      } else if (!req.body.title) {
        return res
          .status(400)
          .json({ message: "No track name in request body" });
      }
      const trackname = req.body.title;
      artworkModule.find({ title: trackname }).then((dbres) => {
        if (!dbres) {
          return res.status(400).json({
            message: "Song title exists",
          });
        }
      });
      var base64String = req.file.buffer.toString("base64");

      const newArtowork = new artworkModule({
        _id: new mongoose.Types.ObjectId(),
        title: trackname,
        base64: base64String,
      });
      newArtowork
        .save()
        .then(() => {
          res.status(200).json({
            message: "artwork saved",
          });
        })
        .catch((e) => {
          res.status(400).json({ message: e });
        });
    });
  },
  getSongArtwork: async (req, res) => {
    var filename = req.query?.title;
    console.log("file name ", filename);
    artworkModule.find({title: filename}).then(Dbres=>{
      if(Dbres){
        Dbres = Dbres[0]
        var img = Buffer.from(Dbres.base64,"base64");
        res.writeHead(200,{'Content-Type': 'image/png',
        'Content-Length': img.length});
        res.end(img)
      }else{
        res.status(400).json({
          message:"failed to return image"
        })
      }
    })
  
  },
};
