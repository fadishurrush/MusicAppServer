const { models } = require("mongoose");
const  historyRouter = require("./historyRoute");
const songRouter = require( "./songRoute");
const artworkRouter = require("./artworkRoute");


 const Routs =  [
    historyRouter , 
    songRouter,
    artworkRouter,
 ] ; 

 module.exports = Routs;


//  export default Routs ; 