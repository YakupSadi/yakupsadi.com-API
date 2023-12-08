const mongoose = require( 'mongoose' )


const InfoDescSchema = new mongoose.Schema({

    short: {
        type     : String,
        required : true
    },

    long: {
        type     : String,
        required : true
    },

    createdAt: {
        type    : Date,
        default : Date.now
    }
})


module.exports = mongoose.model( 'InfoDesc', InfoDescSchema )