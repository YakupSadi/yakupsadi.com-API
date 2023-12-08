const fs   = require( 'fs' )
const path = require( 'path' )

const infoImages = require( '../models/infoImages' )

const asyncModule     = require( '../middleware/asyncModule' )
const { CustomError } = require( '../middleware/customError' )


const fsFunc = ( val ) => {

    fs.unlink( path.join( __dirname, '../', val ), ( err ) => {

        if( err )
        {
            console.log( err )
        }
    })
}


const getImage = asyncModule( async ( req, res, next ) => {

    const image = req.params.image


    if( !image )
    {
        res.status( 404 ).json({ msg: 'Image Not Found' })
        return next( new CustomError( 'Image Not Found', 404 ))
    }


    res.sendFile( path.join( __dirname, '../uploads', image ) )
})


const getAllImages = asyncModule( async ( req, res ) => {

    const data = await infoImages.find( {} )

    res.status( 200 ).json({ data })
})


const createImages = asyncModule( async ( req, res, next ) => {

    const { bgOld, imgOld } = req.body

    const getImg = req.files.image
    const getBg  = req.files.bgImage

    const image   = getImg ? getImg[ 0 ].path : imgOld
    const bgImage = getBg ? getBg[ 0 ].path : bgOld


    if( !image || !bgImage )
    {
        const img = image ? image : bgImage

        if( img ) { fsFunc( img ) }

        res.status( 404 ).json({ msg: 'Image Not Found' })
        return next( new CustomError( 'Image Not Found', 404 ))
    }


    if( bgOld && getBg )
    {
        fsFunc( bgOld )
    }


    if( imgOld && getImg )
    {
        fsFunc( imgOld )
    }


    await infoImages.deleteMany( {} )

    const file = new infoImages({ image, bgImage })
    await file.save()


    res.status( 201 ).json({ msg: 'Images Updated' })
})


module.exports = {

    getImage,
    getAllImages,
    createImages
}