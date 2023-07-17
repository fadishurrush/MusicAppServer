const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const userModule = require("../modules/user.module");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const songModule = require("../modules/song.module");
const nodemailer = require("nodemailer");
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
        ? await songModule.findOne({ title: title }).then((dbres) => {
            if (dbres) {
              userModule.findOne({ email: userEmail }).then((user) => {
                if (user) {
                  var exists = false;
                  for (let index = 0; index < user.Favorites.length; index++) {
                    const element = user.Favorites[index];
                    if (element.title === dbres.title) {
                      exists = true;
                      break;
                    }
                  }
                  if (exists) {
                    var newfav = user.Favorites.filter(
                      (val) => val.title !== title
                    );
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
          })
        : res.status(400).json({ message: "title is empty" });
    } catch (error) {}
  },
  getFav: async (req, res) => {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: "email required" });
      }
      userModule.findOne({ email: email }).then((dbres) => {
        if (!dbres) {
          return res.status(400).json({ message: "no such user" });
        } else {
          return res.status(200).json({ Favorites: dbres.Favorites });
        }
      });
    } catch (error) {
      console.log("get Fav error : ", error);
    }
  },
  AccountRecovery: async (req, res) => {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: "email required" });
      }
      userModule.findOne({ email: email }).then((dbres) => {
        if (!dbres) {
          return res.status(400).json({ message: "no such user" });
        } else {
          // transporter set up
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "fadishurrush@gmail.com",
              pass: "",
            },
          });
          // mail options set up
          var mailOptions = {
            from: "youremail@gmail.com",
            to: `${email}`,
            subject: "Account Recovery from MoZik App",
            text: "thats a test subject",
          };
        }
      });
    } catch (error) {}
  },
  addHistory: async (req, res) => {
    try {
      const { email, newHistory } = req.body;
      if (!email) {
        return res.status(400).json({ message: "email is required" });
      } else if (!newHistory) {
        return res.status(400).json({ message: "newHistory is required" });
      }
      userModule
        .findOne({ email: email })
        .then((val) => {
          if (!val) {
            return res.status(400).json({ message: "user not found" });
          }
          const newHisArray = val.History;
          newHisArray.push(newHistory);
          newHisArray.unshift(newHistory);
          userModule
            .updateOne(
              { email: email },
              {
                $set: {
                  History: newHisArray,
                },
              }
            )
            .then(() => {
              return res.status(200).json({ History: newHisArray });
            });
        })
        .catch((e) => {
          console.log("find user error ->", e);
        });
    } catch (error) {
      console.log("add History error ->", error);
    }
  },
  getHistory: async (req, res) => {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: "email required" });
      }
      userModule.findOne({ email: email }).then((dbres) => {
        if (!dbres) {
          return res.status(400).json({ message: "no such user" });
        } else {
          return res.status(200).json({ History: dbres.History });
        }
      });
    } catch (error) {
      console.log("get History error ->", error);
    }
  },
};
