const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const songModule = require("../modules/song.module");
const MongoClient = require("mongodb").MongoClient;
const { Readable } = require("stream");
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");
const clint = new MongoClient(
  "mongodb+srv://Devil8Pro:FadixDevil_1402@musicapp.yjfs580.mongodb.net/?retryWrites=true&w=majority"
);
const db = clint.db();
module.exports = {
  addSong: (req, res) => {
    let body = req.body;
    const newSong = new songModule({
      _id: new mongoose.Types.ObjectId(),
      title: body?.title,
      artwork: fs.readFileSync(
        "artworks/" + req.files["artwork"][0].originalname
      ),
      artist: body?.artist,
      duration: body?.duration,
      genres: body?.genres,

      song: {
        data: fs.readFileSync("songs/" + req.files["Song"][0].originalname),
      },
    });
    newSong
      .save()
      .then(() => {
        res.status(200).json({
          message: "song saved",
        });
      })
      .catch((e) => {
        res.status(400).json({ message: e });
      });
  },

  getSong: (req, res) => {
    const title = req.query?.title;
    songModule
      .find({ title: title })
      .then((dbRes) => {
        res.status(dbRes ? 200 : 400).json(
          dbres != null
            ? {
                artist: dbres[0]?.artist,
                title: dbres[0]?.title,
                artwork:
                  "https://mozikapp.onrender.com/getSongArtwork?title=" + title,
                url: "https://mozikapp.onrender.com/getSongURL?title=" + title,
                duration: dbres[0]?.duration || null,
                Category: dbres[0]?.Category,
                id: dbres[0]._id,
              }
            : { message: "no such song" }
        );
      })
      .catch((e) => {
        res.status(500).json({ message: e });
      });
  },
  getSongURL: async (req, res) => {
    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");
    var filename = req.body?.title;
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: "songs",
    });
    const files = await bucket.find({ filename }).toArray();
    if (files.length === 0) {
      res.status(407).json({
        message: "file not found",
      });
    } else {
      var id = files[0]?._id;
      var trackId = new ObjectId(id);
      let downloadStream = bucket.openDownloadStream(trackId);

      downloadStream.on("data", (chunk) => {
        res.write(chunk);
      });

      downloadStream.on("error", () => {
        res.sendStatus(404);
      });

      downloadStream.on("end", () => {
        res.end();
      });
    }
  },
  getSongArtwork: (req, res) => {
    if (req.body?.title) {
      res.status(400).json({ messsage: "title required" });
    } else {
      var title = req.body.title;
      songModule.find({ title: title }).then((dbres) => {
        res.status(dbres ? 200 : 400);
        res.set("content-type", "audio/mp3");
        res.set("accept-ranges", "bytes");
        let bucket = new mongodb.GridFSBucket(db, {
          bucketName: "song",
        });

        let downloadStream = bucket.openDownloadStream(
          dbres ? dbres._id : null
        );
        downloadStream.on("data", (chunk) => {
          res.write(chunk);
        });

        downloadStream.on("error", () => {
          res.sendStatus(404);
        });

        downloadStream.on("end", () => {
          res.end();
        });
      });
    }
  },
  deleteSong: (req, res) => {
    const title = req.query.title;
    songModule
      .remove({ title: title })
      .then(() => {
        res.status(200).json({ message: "deleted" });
      })
      .catch((e) => {
        res.status(400).json({ message: e });
      });
  },
  updateSong: (req, res) => {
    const title = req.query.title;
    songModule
      .updateOne({ title: title }, req.body)
      .then(() => {
        res.status(200).json({ message: "updated" });
      })
      .catch((e) => {
        res.status(405).json({ message: e });
      });
  },
  getAllSongs: async (req, res) => {
    songModule.find().then((all) => {
      res
        .status(200)
        .json({ all })
        .catch((e) => {
          res.status(403).json({ message: e });
        });
    });
  },
};
