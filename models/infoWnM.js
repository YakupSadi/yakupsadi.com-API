const mongoose = require( 'mongoose' )


const InfoWnMSchema = new mongoose.Schema({

    data: {
        type     : Array,
        required : true
    },

    createdAt: {
        type    : Date,
        default : Date.now
    }
})


module.exports = mongoose.model( 'InfoWnM', InfoWnMSchema )