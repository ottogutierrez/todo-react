const express = require('express')
const router = express.Router()

router.post('/profile', (req,res,next)=> {
  res.status(200).json({
    token: req.body.token,
    email: req.user.email
  })
})




module.exports = router