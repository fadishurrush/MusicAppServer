const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const multer = require("multer")
const mime = require("mime")
const songModule = require("../modules/song.module");
const MongoClient = require("mongodb").MongoClient;
const { Readable } = require("stream");
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");
const clint = new MongoClient(
  "mongodb+srv://Devil8Pro:FadixDevil_1402@musicapp.yjfs580.mongodb.net/?retryWrites=true&w=majority"
);
const db = clint.db();
const storage = multer.memoryStorage();
        const upload = multer({
          storage: storage,
        });
module.exports = {
  addSong: (req, res) => {
    let body = req.body;
    var title = body?.title
    console.log("title" , title); 
    try {
        // song gridfs upload
        // upload.single("song")(req, res, (err) => {
        //   if (err) {
        //     return res
        //       .status(400)
        //       .json({ message: "Upload Request Validation Failed", error: err });
        //   } else if (!body.title) {
        //     return res.status(400).json({ message: "No track name in request body" });
        //   }
      
        //   let trackName = body.title;
      
        //   // Covert buffer to Readable Stream
        //   const readableTrackStream = new Readable();
      
        //   readableTrackStream.push(req.file.buffer);
        //   readableTrackStream.push(null);
      
        //   let bucket = new mongodb.GridFSBucket(db, {
        //     bucketName: "songs",
        //   });
      
        //   let uploadStream = bucket.openUploadStream(trackName);
        //   let id = uploadStream.id;
        //   readableTrackStream.pipe(uploadStream);
      
        //   uploadStream.on("error", () => {
        //     return res.status(500).json({ message: "Error uploading file" });
        //   });
      
        //   uploadStream.on("finish", () => {
        //     return res.status(201).json({
        //       message:
        //         "File uploaded successfully, stored under Mongo ObjectID: " + id,
        //     });
        //   });
        // });

        // song gridfs upload
        // 
        // 
        // 
        // 
        // artwork gridfs upload
    
        
    // upload.single("artwork")(req, res, (err) => {
    //     if (err) {
    //       return res
    //         .status(400)
    //         .json({ message: "Upload Request Validation Failed", error: err });
    //     } else if (body.title) {
    //       return res.status(400).json({ message: "No track name in request body" });
    //     }
        
    //     let trackName = body.title;
    
    //     // Covert buffer to Readable Stream
    //     const readableTrackStream = new Readable();
    
    //     readableTrackStream.push(req.file.buffer);
    //     readableTrackStream.push(null);
    
    //     let bucket = new mongodb.GridFSBucket(db, {
    //       bucketName: "artworks",
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

        // artwork gridfs upload
        // 
        // 
        // 
    
    const newSong = new songModule({
        _id: new mongoose.Types.ObjectId(),
        title: body?.title,
        artwork: "https://mozikapp.onrender.com/getSongArtwork?title=" + title,
        artist: body?.artist,
        duration: body?.duration,
        genres: body?.genres,
        URL: "https://mozikapp.onrender.com/getSongURL?title=" + title
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
    } catch (error) {
        res.status(400).json({message: "failed due to error: "+error})
    }
    
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
                artwork:dbres[0]?.artwork,
                url: dbres[0]?.URL,
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
  addSongURL: (req, res) => {
    upload.single("song")(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Upload Request Validation Failed", error: err });
      } else if (!req.body.title) {
        return res.status(400).json({ message: "No track name in request body" });
      }
  
      let trackName = req.body.title;
  
      // Covert buffer to Readable Stream
      const readableTrackStream = new Readable();
  
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);
  
      let bucket = new mongodb.GridFSBucket(db, {
        bucketName: "songs",
      });
  
      let uploadStream = bucket.openUploadStream(trackName);
      let id = uploadStream.id;
      readableTrackStream.pipe(uploadStream);
  
      uploadStream.on("error", () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
  
      uploadStream.on("finish", () => {
        return res.status(201).json({
          message:
            "File uploaded successfully, stored under Mongo ObjectID: " + id,
        });
      });
    });
  },
  getSongURL: async (req, res) => {
    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");
    var filename = req.query?.title;
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: "songs",
    });
    console.log("filename ",filename);
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
  addArtworkURL: (req, res) => {
    
    upload.single("artwork")(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Upload Request Validation Failed", error: err });
      } else if (!req.body.title) {
        return res.status(400).json({ message: "No track name in request body" });
      }
      
      let trackName = req.body.title;
  
      // Covert buffer to Readable Stream
      const readableTrackStream = new Readable();
  
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);
  
      let bucket = new mongodb.GridFSBucket(db, {
        bucketName: "artworks",
      });
  
      let uploadStream = bucket.openUploadStream(trackName);
      let id = uploadStream.id;
      readableTrackStream.pipe(uploadStream);
  
      uploadStream.on("error", () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
  
      uploadStream.on("finish", () => {
        return res.status(201).json({
          message:
            "File uploaded successfully, stored under Mongo ObjectID: " + id,
        });
      });
    });
  },
  getSongArtwork:  async (req, res) => {
    res.set("content-type", "image/jpeg");
    res.set("accept-ranges", "bytes");
    var filename = req.body?.title;
    console.log("filename ",filename);
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: "artworks",
    });
    const files = await bucket.find({ filename }).toArray();
    if (files.length === 0) {
        console.log("entered");
      res.status(404).json({
        message: "file not found",
      });
    } else {
      var id = files[0]?._id;
      var trackId = new ObjectId(id);
      console.log("track id ",trackId);
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


