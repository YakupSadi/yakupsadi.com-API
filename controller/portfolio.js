const fs     = require( 'fs' )
const path   = require( 'path' )

const Portfolio = require( '../models/portfolio' )

const asyncModule     = require( '../middleware/asyncModule' )
const { CustomError } = require( '../middleware/customError' )


const getAllProject = asyncModule( async ( req, res ) => {

    const data = await Portfolio.find( {} )

    res.status( 200 ).json({ data })
})


const getProject = asyncModule( async ( req, res, next ) => {

    const image = req.params.image


    if( !image )
    {
        res.status( 404 ).json({ msg: 'Image Not Found' })
        return next( new CustomError( 'Image Not Found', 404 ))
    }


    res.sendFile( path.join( __dirname, '../uploads', image ) )
})


const createProject = asyncModule( async ( req, res, next ) => {

    const { url, baseURL } = req.body
    const image            = req.file


    if( !url || !baseURL )
    {
        fs.unlink( path.join( __dirname, '../', image.path ), ( err ) => {

            if ( err )
            {
                res.status( 400 ).json({ msg: 'Path not found.' })
                return next( new CustomError( 'Path not found.', 400 ) )
            }
        })


        res.status( 400 ).json({ msg: 'Please fill in all fields.' })
        return next( new CustomError( 'Please fill in all fields.', 400 ) )
    }


    if( !image )
    {
        res.status( 400 ).json({ msg: 'Please fill image field.' })
        return next( new CustomError( 'Please fill image field.', 400 ) )
    }


    const imgPath = image.path
 
    const portfolio = new Portfolio({ url, baseURL, imgPath })
    await portfolio.save()


    res.status( 201 ).json({ msg: 'Project Added' })
})


const deleteProject = asyncModule( async ( req, res, next ) => {

    const { image }      = req.body
    const { id: dataID } = req.params


    if ( !dataID || !image )
    {
        res.status( 400 ).json({ msg: 'Item Not Deleted' })
        return next( new CustomError( 'Item Not Deleted', 400 ) )
    }


    fs.unlink( path.join( __dirname, '../', image ), ( err ) => {

        if( err )
        {
            res.status( 400 ).json({ msg: 'Item Not Deleted' })
            return next( new CustomError( 'Item Not Founded' ) )
        }
    })


    await Portfolio.findOneAndDelete({ _id: dataID })


    res.status( 200 ).json({ msg: 'Project Deleted' })
})


module.exports = {

    getProject,
    getAllProject,

    createProject,
    deleteProject,
}