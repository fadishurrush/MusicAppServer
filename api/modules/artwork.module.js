const mongoose = require('mongoose')


const ArtworkModule =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: {type:String , required:true},
    base64:{type:String, required:true}
})

module.exports= mongoose.model('Artwork' , ArtworkModule)