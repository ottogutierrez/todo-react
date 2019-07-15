const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Signup
router.post('/signup', passport.authenticate('signup',{session:false}) ,(req,res, next)=>{
  res.status(200).json({
    message: 'Sign up successful',
    user: {
      email: req.user.email,
      id: req.user._id
    }
  })
})

// Signin
router.post('/signin', (req, res, next)=> {
  passport.authenticate('signin', async (error,user,info) =>{
    try {
      if (error) {
        return next(error)
      }
      if (!user) {
        return res.status(500).send('Username or Password Incorrect')
      }
      // Everything is ok, the user is authenticated
      req.logIn(user, {session: false}, (error)=>{
        // Assemby body of JWT
        const body = {
          user: user.email,
          _id: user._id
        }
        const token = jwt.sign(body, process.env.JWT_SECRET)
        res.json({token})
      })
    } catch (error) {
      return next(error)
    }
  } )(req,res,next)
})

// Login
router.get('/login', (req,res, next)=> {
  res.send('Log in route')
})

module.exports = router