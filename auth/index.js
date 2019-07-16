const mongoose =  require('mongoose')
const userModel = require('../model/index')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt')
const ExtractJwt = require('passport-jwt').ExtractJwt


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

const opts = {}
opts.secretKey = process.env.JWT_SECRET
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken

passport.use(new JwtStrategy(opts, async (jwt_payload, done)=> {
  try {
    const user = await userModel.findOne({email:jwt_payload.email})
    if (!user) {
      done(null,false,{message: "Failed authentication, please sign in again"})
    }

    return done(null,user)
    
  } catch (error) {
    return done(error)
  }
}))