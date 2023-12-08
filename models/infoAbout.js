const mongoose = require( 'mongoose' )


const InfoAboutSchema = new mongoose.Schema({

    about: {
        type     : Array,
        required : true
    },

    createdAt: {
        type    : Date,
        default : Date.now
    }
})


module.exports = mongoose.model( 'InfoAbout', InfoAboutSchema )