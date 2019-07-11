const express = require('express')
const volleyball = require('volleyball')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.urlencoded({extended: true}))
app.use(volleyball)

// Setup routes
const auth = require('./routes/auth')
app.use('/auth', auth)

// Start Server
app.listen(port, ()=> console.log(`Server Listening on port ${port}`))
