const infoDesc = require( '../models/infoDesc' )

const asyncModule     = require( '../middleware/asyncModule' )
const { CustomError } = require( '../middleware/customError' )


const getAllDesc = asyncModule( async ( req, res ) => {

    const data = await infoDesc.find({})

    res.status( 200 ).json({ data })
})


const createDesc = asyncModule( async ( req, res, next ) => {

    const { long, short } = req.body


    if( !long || !short )
    {
        res.status( 400 ).json({ msg: 'Desc Field Cannot Be Empty' })
        return next( new CustomError( 'Desc Field Cannot Be Empty', 400 ))
    }


    if( long.length > 700 || short.length > 140 )
    {
        res.status( 400 ).json({ msg: 'Too many characters!' })
        return next( new CustomError( 'Too many characters!', 400 )) 
    }


    await infoDesc.deleteMany( {} )

    await infoDesc.create({

        short : short,
        long  : long
    })


    res.status( 201 ).json({ msg: 'Descriptions Updated' })
})


module.exports = {

    getAllDesc,
    createDesc
}