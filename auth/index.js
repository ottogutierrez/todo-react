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