const mongoose = require( 'mongoose' )


const AddItemSchema = new mongoose.Schema({

    image: {
        type     : String,
        required : true
    },

    random: {
        type     : String,
        required : true
    },

    createdAt: {
        type    : Date,
        default : Date.now
    }
})


module.exports = mongoose.model( 'AddItem', AddItemSchema )