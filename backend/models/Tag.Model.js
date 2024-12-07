const mongoose = require('mongoose')
const { Schema, model } = mongoose

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Flying',
      'Water',
      'Animals',
      'Nightmare',
      'Adventure',
      'Friends',
      'Family',
      'Work',
      'School',
      'Travel',
      'Fantasy',
      'Love',
      'Death',
      'Unknown',
      'Repetition'
    ]
  }
})

const Tags = mongoose.models.Tag || model('Tag', tagSchema)
module.exports = Tags
