const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const artworkModule = require("../modules/artwork.module");


module.exports={
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

          var base64String = req.file.buffer.toString("base64");
    
          const newArtowork = new artworkModule ({
            _id: new mongoose.Types.ObjectId(),
            title: body?.title,
            base64: base64String
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
        artworkModule.find({title: req.query.title})
        .then(DBres =>{
            console.log("dbres =",DBres);
            
            
            res.status(DBres ? 200 : 400).json(
              DBres != null
                ? {
                    title: DBres[0]?.title,
                    base64: DBres[0]?.base64,
                    id: DBres[0]._id,
                  }
                : { message: "no such artwork" }
            );
          })
      },
}