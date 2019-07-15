const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

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

userSchema.pre('save', async function (next){
  const user = this
  const hash = await bcrypt.hash(user.password,10)
  user.password = hash
  next()
})

userSchema.methods.validatePassword = async function(password){
  const user = this
  const isValid = await bcrypt.compare(password, user.password)
  return isValid
}


var userModel = mongoose.model('user', userSchema)

module.exports =  userModel