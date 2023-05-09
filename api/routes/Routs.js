const { models } = require("mongoose");
const  historyRouter = require("./historyRoute");
const songRouter = require( "./songRoute");
const artworkRouter = require("./artworkRoute");
const UserRouter = require("./UserRoute");


 const Routs =  [
    historyRouter , 
    songRouter,
    artworkRouter,
    UserRouter
 ] ; 

 module.exports = Routs;


//  export default Routs ; 