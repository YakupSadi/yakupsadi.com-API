const User = require( '../models/user' )

const bcrypt          = require( 'bcryptjs' )
const jwt             = require( 'jsonwebtoken' )
const asyncModule     = require( '../middleware/asyncModule' )
const { CustomError } = require( '../middleware/customError' )


const register = asyncModule( async ( req, res, next ) => {

    const { email, password } = req.body


    if( !email || !password )
    {
        res.status( 400 ).json({ msg: 'Email or Password Field Cannot Be Empty' })
        return next( new CustomError( 'Email or Password Field Cannot Be Empty', 400 ) )
    }


    const emailAlreadyExist = await User.findOne({ email })

    if( emailAlreadyExist )
    {
        res.status( 400 ).json({ msg: 'Email Already Exist' })
        return next( new CustomError( 'Email Already Exits', 400 ) )
    }


    const user  = await User.create({ email, password })
    const time  = 1000 * 60 * 60 * 24 * 30
    const token = user.createJWT()

    res.cookie( 'token', token, {

        httpOnly : true,
        expires  : new Date( Date.now() + time )
    })


    res.status( 201 ).json({

        user: {

            email: user.email
        },

        token
    })
})


const login = asyncModule( async ( req, res, next ) => {

    const { email, password } = req.body


    if( !email || !password )
    {
        res.status( 400 ).json({ msg: 'Email or Password Field Cannot Be Empty' })
        return next( new CustomError( 'Email or Password Field Cannot Be Empty', 400 ) )
    }


    const user = await User.findOne({ email })

    if ( !user )
    {
        res.status( 404 ).json({ msg: 'User Not Found' })
        return next( new CustomError( 'User Not Found', 404 ) )
    }


    const isPasswordCorrect = await user.comparePassword( password )

    if( !isPasswordCorrect )
    {
        res.status( 403 ).json({ msg: 'Password is Wrong' })
        return next( new CustomError( 'Password is Wrong', 403 ) )
    }


    const token = user.createJWT()
    const time  = 1000 * 60 * 60 * 24 * 30

    res.cookie( 'token', token, {

        httpOnly : true,
        expires  : new Date( Date.now() + time ) 
    })


    res.status( 200 ).json({

        user: {

            email: user.email
        },

        token
    })
})


const changePassword = asyncModule( async ( req, res, next ) => {

    let token        = null
    const authHeader = req.headers.authorization

    const { pass, newPass } = req.body


    if( !pass || !newPass )
    {
        res.status( 400 ).json({ msg: 'Password Field Cannot Be Emty.' })
        return next( new CustomError( 'Password Field Cannot Be Emty.', 400 ) )
    }


    if( authHeader && authHeader.startsWith( 'Bearer' ) )
    {
        token = authHeader.split(' ')[ 1 ]
    }


    if( !token )
    {
        res.status( 401 ).json({ msg: 'Token Not Found' })
        return next( new CustomError( 'Token Not Found', 401 ) )
    }


    const payload = jwt.verify( token, process.env.JWT_SECRET )
    const email   = payload.email


    const user = await User.findOne({ email })

    if( !user )
    {
        res.status( 404 ).json({ msg: 'User Not Found' })
        return next( new CustomError( 'User Not Found', 404 ) )
    }


    const isPasswordCorrect = await user.comparePassword( pass )

    if( !isPasswordCorrect )
    {
        res.status( 403 ).json({ msg: 'Password is Wrong' })
        return next( new CustomError( 'Password is Wrong', 403 ) )
    }


    const salt     = await bcrypt.genSalt( 10 )
    const password = await bcrypt.hash( newPass, salt )


    await User.findOneAndUpdate({ email: email }, {

        new          : true,
        password     : password,
        runValidators: true
    })


    res.cookie( 'token', 'logOut', {

        httpOnly : true,
        expires  : new Date( Date.now() )
    })


    res.status( 200 ).json({ msg: 'Password Changed' })
})


const changeEmail = asyncModule( async ( req, res, next ) => {

    let token        = null
    const authHeader = req.headers.authorization

    const { pass, newEmail } = req.body


    if( !newEmail || !pass )
    {
        res.status( 400 ).json({ msg: 'Input Fields Cannot Be Empty' })
        return next( new CustomError( 'Input Fieldss Cannot Be Empty', 400 ) )
    }


    if( authHeader && authHeader.startsWith( 'Bearer' ) )
    {
        token = authHeader.split(' ')[ 1 ]
    }


    if( !token )
    {
        res.status( 401 ).json({ msg: 'Token Not Found' })
        return next( new CustomError( 'Token Not Found', 401 ) ) 
    }


    const payload = jwt.verify( token, process.env.JWT_SECRET )
    const email   = payload.email


    const user = await User.findOne({ email })

    if( !user )
    {
        res.status( 404 ).json({ msg: 'User Not Found' })
        return next( new CustomError( 'User Not Found', 404 ) )
    }


    const emailAlreadyExist = await User.findOne({ email: newEmail })

    if( emailAlreadyExist )
    {
        res.status( 400 ).json({ msg: 'Email Already Exist' })
        return next( new CustomError( 'Email Already Exits', 400 ) )
    }


    const isPasswordCorrect = await user.comparePassword( pass )

    if( !isPasswordCorrect )
    {
        res.status( 403 ).json({ msg: 'Password is Wrong' })
        return next( new CustomError( 'Password is Wrong', 403 ) )
    }


    await User.findOneAndUpdate({ email: email }, {

        new           : true,
        email         : newEmail,
        runValidators : true
    })


    res.cookie( 'token', 'logOut', {

        httpOnly : true,
        expires  : new Date( Date.now() )
    })


    res.status( 200 ).json({ msg: 'Email Changed' })
})


const logout = asyncModule( async ( req, res ) => {

    res.cookie( 'token', 'logout', {

        httpOnly : true,
        expires  : new Date( Date.now() )
    })


    res.status( 200 ).json({ msg: 'User Logged Out' })
})


const isValid = asyncModule( async ( req, res ) => {

    res.json({ message: 'Token is Valid' })
})


module.exports = {

    login,
    logout,

    isValid,
    register,

    changeEmail,
    changePassword
}