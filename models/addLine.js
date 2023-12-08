const mongoose = require( 'mongoose' )


const addLineSchema = new mongoose.Schema({

    random: {
        type: String,
    },

    createdAt: {
        type    : Date,
        default : Date.now
    },
})


module.exports = mongoose.model( 'addLine', addLineSchema )