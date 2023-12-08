const express  = require( 'express' )
const InfoDesc = express.Router()

const Auth = require( '../middleware/auth' )


const {

    getAllDesc,
    createDesc

} = require( '../controller/infoDesc' )


InfoDesc.route( '/' )
    .get( getAllDesc )
    .post( Auth, createDesc )


module.exports = InfoDesc