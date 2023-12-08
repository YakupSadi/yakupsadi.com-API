const fs     = require( 'fs' )
const path   = require( 'path' )
const random = require( 'randomstring' )

const addItem = require( '../models/addItem' )
const addLine = require( '../models/addLine' )

const asyncModule     = require( '../middleware/asyncModule' )
const { CustomError } = require( '../middleware/customError' )


const getAllSkills = asyncModule( async ( req, res ) => {

    const data = await addItem.find( {} )

    res.status( 200 ).json({ data })
})


const getSkill = asyncModule( async ( req, res, next ) => {

    const image = req.params.image


    if( !image )
    {
        res.status( 404 ).json({ msg: 'Image Not Found' })
        return next( new CustomError( 'Image Not Found', 404 ))
    }


    res.sendFile( path.join( __dirname, '../uploads', image ) )
})


const getLine = asyncModule( async( req, res ) => {

    const data = await addLine.find( {} )

    res.status( 200 ).json({ data })
})


const createLine = asyncModule( async ( req, res ) => {

    const data = random.generate( 7 )


    await addLine.create({

        random: data
    })


    res.status( 201 ).json({ msg: 'Line Created' })
})


const createItem = asyncModule( async ( req, res, next ) => {

    const { random } = req.body
    const image      = req.file.path


    if( !image )
    {
        fs.unlink( path.join( __dirname, '../', image ), ( err ) => {

            if ( err )
            {
                console.log( err )
            }
        })

    
        res.status( 400 ).json({ msg: 'Image Field Cannot Be Empty' })
        return next( new CustomError( 'Image Field Cannot Be Empty', 400 ) )
    }


    const file = new addItem({ image, random })
    await file.save()


    res.status( 201 ).json({ msg: 'Skill Added' })
})


const deleteLine = asyncModule( async ( req, res, next ) => {

    const { id: dataID } = req.params


    if ( !dataID )
    {
        res.status(400).json({ msg: 'Line Not Founded' })
        return next( new CustomError( 'Line Not Founded', 400 ) )
    }


    await addLine.findOneAndDelete({ _id: dataID })


    res.status(200).json({ msg: 'Line Deleted' })
})


const deleteItem = asyncModule( async ( req, res, next ) => {

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
            return next( new CustomError( 'Item Not Founded' ) )
        }
    })


    await addItem.findOneAndDelete({ _id: dataID })


    res.status( 200 ).json({ msg: 'Item Deleted' })
})


module.exports = {

    getLine,
    getSkill,
    getAllSkills,

    createItem,
    createLine,

    deleteItem,
    deleteLine,
}