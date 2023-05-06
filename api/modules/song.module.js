const mongoose = require('mongoose')


const songModule =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: {type:String , required:true},
    artwork:{type: String},
    artist:{type:String , required:true},
    duration:{type:Number , required:true},
    Category:{type:[String] , required:true},
    url:{type:String}
})

module.exports= mongoose.model('Song' , songModule)