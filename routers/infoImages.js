const express    = require( 'express' )
const InfoImages = express.Router()

const Auth   = require( '../middleware/auth' )
const Multer = require( '../middleware/multer' )


const {

    getImage,
    getAllImages,
    createImages

} = require( '../controller/infoImages' )


InfoImages.route( '/' )
    .get( getAllImages )
    .post( Auth, Multer.fields([{ name: 'image' }, { name: 'bgImage' }]), createImages )

InfoImages.route( '/uploads/:image' )
    .get( getImage )


module.exports = InfoImages