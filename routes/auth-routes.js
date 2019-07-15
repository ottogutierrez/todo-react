const express = require('express')
const router = express.Router()
const passport = require('passport')

// Signup
router.post('/signup', passport.authenticate('signup',{session:false}) ,(req,res)=>{
  res.status(200).json({
    message: 'Sign up successful',
    user: {
      email: req.user.email,
      id: req.user._id
    }
  })
})

// Signin
router.get('/signin', (req, res)=> {
  res.send('Sign in route')
})

// Login
router.get('/login', (req,res)=> {
  res.send('Log in route')
})

module.exports = router