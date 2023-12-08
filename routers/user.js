const express = require( 'express' )
const User    = express.Router()

const Auth = require( '../middleware/auth' )


const {
 
    login,
    logout,

    isValid,
    register,

    changeEmail,
    changePassword

} = require( '../controller/user' )


User.route( '/login' )
    .post( login )

User.route( '/register' )
    .post( register )

User.route( '/logout' )
    .post( Auth, logout )

User.route( '/auth' )
    .post( Auth, isValid )

User.route( '/changeEmail' )
    .post( Auth, changeEmail )

User.route( '/changePassword' )
    .post( Auth, changePassword )


module.exports = User