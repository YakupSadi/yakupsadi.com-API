const express = require( 'express' )
const AddIcon = express.Router()

const Auth   = require( '../middleware/auth' )
const Multer = require( '../middleware/multer' )


const {

    getIcon,
    createIcon,
    deleteIcon,
    getAllIcons

} = require( '../controller/addIcon' )


AddIcon.route( '/' )
    .get( getAllIcons )
    .post( Auth, Multer.single( 'image' ), createIcon )

AddIcon.route( '/uploads/:image' )
    .get( getIcon )

AddIcon.route( '/deleteIcon/:id' )
    .delete( Auth, deleteIcon )


module.exports = AddIcon