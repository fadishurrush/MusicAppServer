const mongoose = require('mongoose')


const songModule =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: {type:String , required:true},
    artwork:{type: String},
    artist:{type:String , required:true},
    duration:{type:Number , required:false},
    Category:{type:[Number] , required:true},
    URL:{type:String}
})

module.exports= mongoose.model('Song' , songModule)