const express = require("express");
const morgan = require("morgan");
const App = express();
const mongoose = require("mongoose");
const songRouter = require("./api/routes/songRoute");
mongoose.connect(
  "mongodb+srv://Devil8Pro:FadixDevil_1402@musicapp.yjfs580.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", () => {
  console.log("mongo conected");
});
App.use(express.json());

App.use(morgan('dev'));
App.use('/',songRouter)

module.exports = App;
