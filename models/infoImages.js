const mongoose = require( 'mongoose' )


const InfoImageSchema = new mongoose.Schema({

    image: {
        type     : String,
        required : true
    },

    bgImage: {
        type     : String,
        required : true
    },

    createdAt: {
        type    : Date,
        default : Date.now
    }
})


module.exports = mongoose.model( 'InfoImage', InfoImageSchema )