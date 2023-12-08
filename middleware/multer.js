const Multer          = require( 'multer' )
const { CustomError } = require( '../middleware/customError' )


const MulterLimit = Multer({

    limits: 1024 * 1024 * 1,

    fileFilter: ( req, file, cb ) => {

        if( !file.originalname.match( /\.(jpg|jpeg|png|svg)$/ ) )
        {
            return cb( new CustomError( 'Image Not Found' ) )
        }

        cb( null, true )
    },

    storage: Multer.diskStorage({

        filename: ( req, file, cb ) => {

            const uniqueSuffix = Date.now() + '-' + Math.round( Math.random() * 1E9 )
            cb( null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split( '.' ).pop() )
        },

        destination: ( req, file, cb ) => {

            cb( null, 'uploads/' )
        }
    })
})


module.exports = MulterLimit