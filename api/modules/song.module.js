const mongoose = require('mongoose')


const songModule =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: {type:String , required:true},
    artwork:{type: Buffer},
    artist:{type:String , required:true},
    duration:{type:Number , required:false},
    Category:{type:[Number] , required:true},
    song:{
        data:{type:Buffer},
    }
})

module.exports= mongoose.model('Song' , songModule)