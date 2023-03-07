const { models } = require("mongoose");
const  historyRouter = require("./historyRoute");
const songRouter = require( "./songRoute");


 const Routs =  [
    historyRouter , 
    songRouter
 ] ; 

 module.exports = Routs;


//  export default Routs ; 