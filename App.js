const express = require("express");
const morgan = require("morgan");
const App = express();
const mongoose = require("mongoose");
const Routs = require("./api/routes/Routs");

mongoose.connect(
  "mongodb+srv://Devil8Pro:FadixDevil_1402@musicapp.yjfs580.mongodb.net/?retryWrites=true&w=majority",
  (err, database) => {
    if (err) {
      console.log(
        "MongoDB Connection Error. Please make sure that MongoDB is running."
      );
      process.exit(1);
    }
  }
);

mongoose.connection.on("connected", () => {
  console.log("mongo conected");
});
App.use(express.json());

App.use(morgan("dev"));
App.use("/", Routs);

// trackRoute.get('/getSongURL', (req, res) => {

//   res.set('content-type', 'audio/mp3');
//   res.set('accept-ranges', 'bytes');
//   var id = req.body.id
//   console.log("id ",id);
//   var trackID = new ObjectId(id)
//   let bucket = new mongodb.GridFSBucket(db, {
//     bucketName: 'songs'
//   });
//   let downloadStream = bucket.openDownloadStream(trackID);

//   downloadStream.on('data', (chunk) => {
//     res.write(chunk);
//   });

//   downloadStream.on('error', () => {
//     res.sendStatus(404);
//   });

//   downloadStream.on('end', () => {
//     res.end();
//   });
// });

// trackRoute.post("/addsong", (req, res) => {
//   const storage = multer.memoryStorage();
//   const upload = multer({
//     storage: storage,
//   });
//   upload.single("song")(req, res, (err) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ message: "Upload Request Validation Failed", error: err });
//     } else if (!req.body.name) {
//       return res.status(400).json({ message: "No track name in request body" });
//     }

//     let trackName = req.body.name;

//     // Covert buffer to Readable Stream
//     const readableTrackStream = new Readable();

//     readableTrackStream.push(req.file.buffer);
//     readableTrackStream.push(null);

//     let bucket = new mongodb.GridFSBucket(db, {
//       bucketName: "songs",
//     });

//     let uploadStream = bucket.openUploadStream(trackName);
//     let id = uploadStream.id;
//     readableTrackStream.pipe(uploadStream);

//     uploadStream.on("error", () => {
//       return res.status(500).json({ message: "Error uploading file" });
//     });

//     uploadStream.on("finish", () => {
//       return res.status(201).json({
//         message:
//           "File uploaded successfully, stored under Mongo ObjectID: " + id,
//       });
//     });
//   });
// });

module.exports = App;
