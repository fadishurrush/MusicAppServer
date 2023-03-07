const { default: mongoose } = require("mongoose");
const songModule = require("../modules/song.module");

module.exports = {
    addSong : (req,res)=>{
        let body = req.body;
        const newSong = new songModule({
            _id: new mongoose.Types.ObjectId(),
            title:body?.title,
            url:body?.title, 
            artwork:body?.artwork,
            artist:body?.artist,
            duration:body?.duration,
            genres:body?.genres,
        })
        newSong.save().then(()=>{
            res.status(200).json({
                message:"done"
            });
        }).catch(e =>{
            res.status(400).json({message: e})
        })
    },

    getSong : (req,res)=>{
        const title = req.query.title;
        songModule.find({title:title})
        .then(dbRes =>{
            res.status(dbRes ? 200 : 400).json(dbRes || {message:"no such song"})
        }).catch(e =>{
            res.status(500).json({message: e})
        })
    },
    deleteSong : (req,res)=>{
        const title = req.query.title;
        songModule.remove({title:title})
        .then(() =>{
            res.status( 200 ).json({message:"deleted"})
        }).catch(e =>{
            res.status(400).json({message: e})
        })
    },
    updateSong : (req,res)=>{
        const title = req.query.title;
        songModule.updateOne({title:title},req.body)
        .then(() =>{
            res.status(200).json({message:"updated"})
        }).catch(e =>{
            res.status(405).json({message: e})
        })
    },
    getAllSongs : async(req,res)=>{
        songModule.find()
        .then((all)=>{
            res.status(200).json({all}).catch(e =>{
                res.status(403).json({message:e})
            })
        })
    },

}