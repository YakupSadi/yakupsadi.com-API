const infoAbout = require( '../models/infoAbout' )

const asyncModule     = require( '../middleware/asyncModule' )
const { CustomError } = require( '../middleware/customError' )


const getAllAbout = asyncModule( async ( req, res ) => {

    const data = await infoAbout.find({})

    res.status( 200 ).json({ data })
})


const createAbout = asyncModule( async ( req, res, next ) => {

    const data = req.body


    if( !data )
    {
        res.status( 404 ).json({ msg: 'Data Not Found' })
        return next( new CustomError( 'Data Not Found', 404 ))
    }


    await infoAbout.deleteMany( {} )

    await infoAbout.create({

        about: data
    })


    res.status( 201 ).json({ msg: 'About Updated' })
})


module.exports = {

    getAllAbout,
    createAbout
}