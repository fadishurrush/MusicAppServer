const mongoose = require('mongoose')


const personModule =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: {type:String , required:false}
})

module.exports= mongoose.model('Person' , personModule)