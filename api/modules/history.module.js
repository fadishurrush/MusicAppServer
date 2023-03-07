const mongoose = require('mongoose')


const historyModule =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    day: {type:Date , required:true},
    song:[{type: mongoose.Schema.Types.ObjectId,ref:"Song"}],
})

module.exports= mongoose.model('History' , historyModule)