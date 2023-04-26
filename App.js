const express = require("express");
const morgan = require("morgan");
const App = express();
const multer = require("multer");
const mongoose = require("mongoose");
const Routs = require("./api/routes/Routs");
const fs = require("fs")
mongoose.connect(
  "mongodb+srv://Devil8Pro:FadixDevil_1402@musicapp.yjfs580.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", () => {
  console.log("mongo conected");
});
App.use(express.json());

App.use(morgan("dev"));
App.use("/", Routs);
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.fieldname === "Song") {
//       cb(null, "songs");
//     } else {
//       cb(null, "artworks");
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// App.post(
//   "/addsong",
//   upload.fields([
//     { name: "Song", maxCount: 1 },
//     { name: "artwork", maxCount: 1 },
//   ]),
//   (req, res) => {

// res.status(200).json({message : req.files['Song'][0].originalname,
// song: fs.readFileSync("songs/"+req.files['Song'][0].originalname),
// artwork: fs.readFileSync("artworks/"+req.files['artwork'][0].originalname)})
  //   let body = req.body;

  //   const newSong = new songModule({
  //     _id: new mongoose.Types.ObjectId(),
  //     title: body?.title,
  //     artwork: fs.readFileSync("uploads/" + req.files["art"]),
  //     artist: body?.artist,
  //     duration: body?.duration,
  //     genres: body?.genres,
  //     song: {
  //       data: fs.readFileSync("uploads/" + req.file.fieldname("Song")),
  //     },
  //   });
  //   newSong
  //     .save()
  //     .then(() => {
  //       res.status(200).json({
  //         message: "song saved",
  //       });
  //     })
  //     .catch((e) => {
  //       res.status(400).json({ message: e });
  //     });
//   }
// );

module.exports = App;
