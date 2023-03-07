const moment = require("moment/moment");
const historyModule = require("../modules/history.module");

module.exports = {
  getHistory: (req, res) => {
    const arr = [];
    for (let index = 0; index < 7; index++) {
      const day = moment().subtract(index, "days").calendar();

    historyModule.findOne({ day: day }).then(val =>{
        if(val){
            arr.push(val)
        }
    }).catch((e) => {
        res.status(500).json({ message: e });
      })
      
    }   

    res
      .status(arr.length ? 200 : 503)
      .json(
        arr.length > 0
          ? { message: "done", arr }
          : { message: "error empty arr ..." }
      );
  },
  addHistory:(req,res)=>{
    
        let body = req.body;
        const newDay = new historyModule({
            _id: new mongoose.Types.ObjectId(),
            day: body?.date,
            song:body?.songs
        })
        newDay.save().then(()=>{
            res.status(200).json({
                message:"done"
            });
        }).catch(e =>{
            res.status(400).json({message: e})
        })
    },
};
