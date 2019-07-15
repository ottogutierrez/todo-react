const mongoose =  require('mongoose')
const userModel = require('../model/index')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


// Signup Strategy
passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) =>  {
  try {
    const user = await userModel.create({email,password})
    done(null,user)
  } catch (error) {
    return done(error)
  }
} ))

// Signin Strategy
passport.use('signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async(email, password, done) => {
  try {
    const user = await userModel.findOne({email: email})
    if (!user) {
      done(null,false,{message: 'User does not exist'})
    }
    const passwordValid = await user.validatePassword(password)
    if (!passwordValid) {
      done(null,false,{message: 'Password is not valid'})
    }
    // If password is valid, return the user
    done(null,user)

  } catch (error) {
    done(error)
  }
}))