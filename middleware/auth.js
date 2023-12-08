const jwt             = require( 'jsonwebtoken' )
const { CustomError } = require( './customError' )


const Auth = async ( req, res, next ) => {

    let token
    const authHeader = req.headers.authorization


    if ( authHeader && authHeader.startsWith( 'Bearer' ) )
    {
        token = authHeader.split(' ')[ 1 ]
    }


    if ( !token )
    {
        return next( new CustomError( 'Not Found Token', 401 ) )
    }


    try
    {
        const payload = jwt.verify( token, process.env.JWT_SECRET )

        req.user = {

            userId : payload.userId, 
            email  : payload.email
        }

        next()
    }
    catch ( err )
    {
        return next( new CustomError( 'Not Found User', 401 ) )
    }
}


module.exports = Auth