const fs     = require( 'fs' )
const path   = require( 'path' )
const random = require( 'randomstring' )

const AddIcon = require( '../models/addIcon' )

const asyncModule     = require( '../middleware/asyncModule' )
const { CustomError } = require( '../middleware/customError' )


const getIcon = asyncModule( async( req, res, next ) => {

    const image = req.params.image


    if( !image )
    {
        res.status( 404 ).json({ msg: 'Image Not Found' })
        return next( new CustomError( 'Image Not Found', 404 ))
    }


    res.sendFile( path.join( __dirname, '../uploads', image ) )
})


const getAllIcons = asyncModule( async( req, res ) => {

    const data = await AddIcon.find( {} )

    res.status( 200 ).json({ data })
})


const createIcon = asyncModule( async( req, res, next ) => {

    const { svgPath } = req.body
    const iconSVG     = req.file
    const data        = random.generate( 7 )


    if( svgPath )
    {
        if( iconSVG )
        {
            fs.unlink( path.join( __dirname, '../', iconSVG.path ), ( err ) => {

                if( err )
                {
                    console.log( err )
                }
            })
        }

        await AddIcon.create({ image: svgPath, title: 'url', random: data })
    }
    else
    {
        if( iconSVG )
        {
            let svgTitle = iconSVG.mimetype === 'image/svg+xml' ? 'svg' : 'img'

            await AddIcon.create({ image: iconSVG.path, title: svgTitle, random: data })
        }
        else
        {
            res.status( 400 ).json({ msg: 'Icon Fields Cannot Be Empty.' })
            return next( new CustomError( 'Icon Fields Cannot Be Empty.', 400 ))
        }
    }


    res.status( 201 ).json({ msg: 'Icon Added' })
})


const deleteIcon = asyncModule( async( req, res, next ) => {

    const { image, title } = req.body
    const { id: dataID }   = req.params


    if ( !dataID && !image && !title )
    {
        res.status( 400 ).json({ msg: 'Icon Not Deleted' })
        return next( new CustomError( 'Icon Not Deleted', 400 ) )
    }


    if( title === 'svg' || title === 'img' )
    {
        fs.unlink( path.join( __dirname, '../', image ), ( err ) => {

            if( err )
            {
                res.status( 400 ).json({ msg: 'Icon Not Deleted' })
                return next( new CustomError( 'Icon Not Founded' ) )
            }
        })
    }


    await AddIcon.findOneAndDelete({ _id: dataID })


    res.status( 200 ).json({ msg: 'Icon Deleted' })
})


module.exports = {

    getIcon,
    createIcon,
    deleteIcon,
    getAllIcons
}