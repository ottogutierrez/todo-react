const express = require('express')
const router = express.Router()

// Signup
router.get('/signup', (req,res)=>{
  res.send('Sign up route')
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