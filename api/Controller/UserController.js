const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const userModule = require("../modules/user.module");

module.exports={
    Login: (req , res) =>{
        if(!req.body.email){
            return res.status(400).json({
                message:"email is required"
            })
        }else if(!req.body.password){
            return res.status(400).json({
                message:"password is required"
            })  
        }else{
            userModule.find({email : req.body.email})
            .then((dbres)=>{
                console.log("dbres" , dbres);
                console.log("body " , req.body);
                console.log("body.pass " , req.body.password);
                console.log("dbres.pass " , dbres[0].password);

                if(!dbres){
                    return res.status(400).json({
                        message : "no such user",
                        validation : false
                    })
                }
                if(dbres[0].password !== req.body.password){
                    
                    return (
                        res.status(400)
                        .json({
                            message:'wrong password',
                            validation: false,
                        })
                            )
                    
                }else{
                    return (
                        res.status(dbres ? 200 : 400)
                        .json({
                            message:'valid',
                            validation: true,
                            token: dbres[0]._id
                        })
                            )
                }
            })
        }
    },
    Register: (req , res) =>{
        
        if(!req.body.email || !req.body.password){
            return res.status(400).json({
                message:"email and pass required"
            })
        }else if(req.body.email.trim() === "" || !req.body.password.trim() === "" ){
            return res.status(400).json({
                message:"email or pass is empty"
            })
        }else if(
            userModule.find({email: req.body.email}).then((dbres) => {
                if (dbres){
                    return res.status(400).json({
                        message:"email already in use"
                    })
                }
            })
        )

        var id = new mongoose.Types.ObjectId()
        const newUser = new userModule({
            _id: id,
            email: req.body.email,
            password: req.body.password
        });
          newUser
            .save()
            .then(() => {
              res.status(200).json({
                message: "User saved",
                valid: true,
                token: id
              })
            })
            .catch((e) => {
              res.status(400).json({ message: e });
            });
    },
}