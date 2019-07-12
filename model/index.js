const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
})


const userModel = mongoose.model('user', userSchema)

exports.default =  userModel