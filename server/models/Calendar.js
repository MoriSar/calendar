// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const calendarSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    calendar: [{
        title: {
            type: String
        },
        start: {
            type: Number
        },
        duration: {
            type: Number
        }
    }]
})

// the schema is useless so far
// we need to create a model using it
const Calendar = mongoose.model('Calendar', calendarSchema)

// make this available to our users in our Node applications
module.exports = Calendar
