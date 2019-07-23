const express = require('express')
const router = express.Router()
const TaskModel = require('../model/task')

router.post('/profile', (req,res,next)=> {
  res.status(200).json({
    token: req.body.token,
    email: req.user.email
  })
})

// Create Task
router.post('/', async (req,res,next)=>{
  try {
    // Assemble task to save
    console.table('Body: ' + req)
    const title = req.body.title 
    const user = req.user.email
    const isComplete = false
    const newTask = await TaskModel.create({title,isComplete,user})
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({error})
  }
  
})

// Delete task
router.delete('/:id', async (req,res,next)=> {
  try {
    const id = req.params.id
    const user = req.user.email
    const response = await TaskModel.findOneAndDelete({_id: id, user: user})
    console.log(response)
    if (!response) {
      res.status(304).json({
        message: 'Task does not exist, nothing was deleted'
      })
      return next()
    }
    res.status(200).json({
      message: `Successfully deleted task with ID: ${id}`,
      user: user
    })
    
  } catch (error) {
    res.status(500).json({error})
  }
})


module.exports = router