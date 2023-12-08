const express   = require( 'express' )
const Portfolio = express.Router()

const Auth   = require( '../middleware/auth' )
const Multer = require( '../middleware/multer' )


const {

    getProject,
    getAllProject,
    createProject,
    deleteProject,

} = require( '../controller/portfolio' )


Portfolio.route( '/' )
    .get( getAllProject )
    .post( Auth, Multer.single( 'image' ), createProject )

Portfolio.route( '/uploads/:image' )
    .get( getProject )

Portfolio.route( '/deleteProject/:id' )
    .delete( Auth, deleteProject )


module.exports = Portfolio