const mongoose = require( 'mongoose' )


const PortfolioSchema = new mongoose.Schema({

    url: {
        type     : String,
        required : true
    },

    baseURL: {
        type     : String,
        required : true
    },

    imgPath: {
        type     : String,
        required : true
    },

    createdAt: {
        type    : Date,
        default : Date.now
    }
})


module.exports = mongoose.model( 'Portfolio', PortfolioSchema )