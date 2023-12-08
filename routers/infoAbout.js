const express   = require( 'express' )
const InfoAbout = express.Router()

const Auth = require( '../middleware/auth' )


const {

    getAllAbout,
    createAbout

} = require( '../controller/infoAbout' )


InfoAbout.route( '/' )
    .get( getAllAbout )
    .post( Auth, createAbout )


module.exports = InfoAbout