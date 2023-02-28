const mongoose = require('mongoose')


const songModule =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: {type:String , required:true},
    url:{type:String , required:true},
    artwork:{type:String , required:true},
    artist:{type:String , required:true},
    duration:{type:Number , required:false},
    genres:{type:[String] , required:true},
})

module.exports= mongoose.model('Song' , songModule)