const express = require('express')
const volleyball = require('volleyball')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.urlencoded({extended: true}))
app.use(volleyball)

// Connect to MongoDB database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
{
  useNewUrlParser: true,
  useCreateIndex: true
})

mongoose.connection.on('error', error => console.log(error))


// Setup routes
const auth = require('./routes/auth')
app.use('/auth', auth)

// Start Server
app.listen(port, ()=> console.log(`Server Listening on port ${port}`))
