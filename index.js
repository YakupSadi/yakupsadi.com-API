require( 'dotenv' ).config()

const express = require( 'express' )
const app     = express()
const PORT    = 'https://yakupsadi.com/api/v1/'


// Database
const connectDB = require( './db/connect' )


// Uploads
app.use( express.static( 'uploads' ) )


// Json
app.use( express.json() )


// Cors
const cors = require( 'cors' )
app.use( cors() )


// Cookie
const cookieParser = require( 'cookie-parser' )
app.use( cookieParser() )


// Routers
const User      = require( './routers/user' )
const Skills    = require( './routers/skills' )
const AddIcon   = require( './routers/addIcon' )
const Portfolio = require( './routers/portfolio' )

const infoWnM    = require( './routers/infoWnM' )
const InfoDesc   = require( './routers/infoDesc' )
const InfoAbout  = require( './routers/infoAbout' )
const InfoImages = require( './routers/infoImages' )


// API
app.use( '/api/v1/', User )
app.use( '/api/v1/skills', Skills )
app.use( '/api/v1/addIcon', AddIcon )
app.use( '/api/v1/portfolio', Portfolio )

app.use( '/api/v1/infoWnM', infoWnM )
app.use( '/api/v1/infoDesc', InfoDesc )
app.use( '/api/v1/infoAbout', InfoAbout )
app.use( '/api/v1/infoImages', InfoImages )


// Connect DB
const start = async () => {

    try 
    {
        await connectDB( process.env.MONGO_URL )

        app.listen( PORT, () => console.log( `Server is listening on port: http://localhost:${ PORT }/` ) )
    }
    catch ( err )
    {
        console.log( err )
    }
}

start()