const mongoose = require( 'mongoose' )


const AddIconSchema = new mongoose.Schema({

    image: {
        type: String
    },

    title: {
        type: String
    },

    random: {
        type: String
    },

    createdAt: {
        type    : Date,
        default : Date.now
    }
})


module.exports = mongoose.model( 'AddIcon', AddIconSchema )