const InfoWnM = require( '../models/infoWnM' )

const asyncModule     = require( '../middleware/asyncModule' )
const { CustomError } = require( '../middleware/customError' )


const getAllWnM = asyncModule( async ( req, res ) => {

    const data = await InfoWnM.find({})

    res.status( 200 ).json({ data })
})


const createWnM = asyncModule( async ( req, res, next ) => {

    const data = req.body


    if( !data )
    {
        res.status( 400 ).json({ msg: 'Data Field Cannot Be Empty' })
        return next( new CustomError( 'Data Field Cannot Be Empty', 400 ))
    }


    await InfoWnM.deleteMany( {} )

    await InfoWnM.create({ data: data })


    res.status( 201 ).json({ msg: 'Data Updated' })
})


module.exports = {

    getAllWnM,
    createWnM
}