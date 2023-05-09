const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const userModule = require("../modules/user.module");

module.exports={
    Login: (req , res) =>{
        if(req.body.email){
            return res.status(400).json({
                message:"email is required"
            })
        }else if(req.body.password){
            return res.status(400).json({
                message:"password is required"
            })  
        }else{
            userModule.find({email : req.body.email})
            .then((dbres)=>{
                if(dbres.password === req.body.password){
                    return (
                res.status(dbres ? 200 : 400)
                .json({
                    message:'valid',
                    validation: true,
                    token: dbres._id
                })
                    )
                    
                }else{
                    return (
                        res.status(dbres ? 200 : 400)
                        .json({
                            message:'wrong password',
                            validation: false,
                        })
                            )
                }
            })
        }
    },
    Register: (req , res) =>{
        if(req.body.email || req.body.password){
            return res.status(400).json({
                message:"email and pass required"
            })
        }
        const newUser = new userModule({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password
        });
          newSong
            .save()
            .then(() => {
              res.status(200).json({
                message: "User saved",
                valid: true,
                token: userModule.find({email: req.body.email})._id
              })
            })
            .catch((e) => {
              res.status(400).json({ message: e });
            });
    },
}