const express = require( 'express' )
const Skills  = express.Router()

const Auth   = require( '../middleware/auth' )
const Multer = require( '../middleware/multer' )


const {

    getLine,
    getSkill,
    getAllSkills,

    createItem,
    createLine,

    deleteItem,
    deleteLine,

} = require( '../controller/skills' )


Skills.route( '/item' )
    .get( getAllSkills )
    .post( Auth, Multer.single( 'image' ), createItem )

Skills.route( '/uploads/:image' )
    .get( getSkill )

Skills.route( '/line' )
    .get( getLine )
    .post( Auth, createLine )

Skills.route( '/deleteItem/:id' )
    .delete( Auth, deleteItem )

Skills.route( '/deleteLine/:id' )
    .delete( Auth, deleteLine )


module.exports = Skills