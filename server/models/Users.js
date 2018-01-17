// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  _id: {
    type: Number,
    unique: false,
    required: true,
  },
  name: {
    type: String,
    unique: false,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema)

// make this available to our users in our Node applications
module.exports = User
