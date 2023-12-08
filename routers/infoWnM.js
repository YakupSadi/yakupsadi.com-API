const express = require( 'express' )
const InfoWnM = express.Router()

const Auth = require( '../middleware/auth' )


const {

    getAllWnM,
    createWnM

} = require( '../controller/infoWnM' )


InfoWnM.route( '/' )
    .get( getAllWnM )
    .post( Auth, createWnM )


module.exports = InfoWnM