const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const userModule = require("../modules/user.module");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const songModule = require("../modules/song.module");
module.exports = {
  Login: async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.query;

      // Validate user input
      if (!(email && password)) {
        res.status(407).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await userModule.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const JWT_SECRET =
          "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
        const token = jwt.sign({ user_id: user._id, email }, JWT_SECRET);

        // save user token
        user.token = token;

        // user
        res.status(200).json({ user: user });
      }
      res.status(403).json({ message: "Invalid Credentials" });
    } catch (err) {
      console.log(err);
    }
  },
  Register: async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(408).json({ message: "All input is required" });
      }
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await userModule.findOne({ email });

      if (oldUser) {
        return res
          .status(207)
          .json({ message: "User Already Exist. Please Login" });
      }
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await userModule.create({
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
      console.log("user created");

      const JWT_SECRET =
        "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, JWT_SECRET);

      // save user token
      user.token = token;
      // return new user
      res.status(200).json({ user: user });
    } catch (err) {
      console.log(err);
    }
  },
  setFav: async (req, res) => {
    try {
      const { title } = req.body;
      const { userEmail } = req.body;
      title || userEmail
        ? null
        : res.status(400).json({ message: "title is empty" });
      await songModule.findOne({ title: title }).then((dbres) => {
        if (dbres) {
          userModule.findOne({ email: userEmail }).then((user) => {
            if (user) {
              console.log("dbres ",dbres);
              console.log("favo ",user.Favorites);
              var exists = false ;
              for (let index = 0; index < user.Favorites.length; index++) {
                const element = user.Favorites[index];
                console.log("element :",element);
                if(element.title === dbres.title){
                  exists = true;
                  break;
                }
              }
              console.log("exists" ,exists);
              if (exists) {
                var newfav = user.Favorites.filter((val)=> val.title !==title)
                userModule
                  .updateOne(
                    { email: userEmail },
                    {
                      $set: {
                        Favorites: newfav,
                      },
                    }
                  )
                  .then(() => {
                    return res
                      .status(dbres ? 200 : 400)
                      .json(
                        dbres
                          ? { message: "song removed from fav" }
                          : { message: "no song found" }
                      );
                  });
              } else {
                userModule
                  .updateOne(
                    { email: userEmail },
                    {
                      $set: {
                        Favorites: [...user.Favorites, dbres],
                      },
                    }
                  )
                  .then(() => {
                    return res
                      .status(dbres ? 200 : 400)
                      .json(
                        dbres
                          ? { message: "song added to fav" }
                          : { message: "no song found" }
                      );
                  });
              }
            } else {
              return res.status(400).json({ message: "user not found" });
            }
          });
        }
      });
    } catch (error) {}
  },
  getFav: async (req, res) => {
    try {
      const {email} = req.query
      if(!email){
        return res.status(400).json({message:"email required"})
      }
      userModule.findOne({email:email}).then((dbres)=>{
        if(!dbres){
          return res.status(400).json({message:"no such user"})
        }else{
          return res.status(200).json({Favorites:dbres.Favorites})
        }
      })
    } catch (error) {
      console.log("get Fav error : ",error);
    }
  },
};
