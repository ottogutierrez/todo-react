const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    type: String,
    required:true,
    index: true
  }
})


const TaskModel = mongoose.model('task', TaskSchema)

module.exports = TaskModel

