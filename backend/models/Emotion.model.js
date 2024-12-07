const mongoose = require('mongoose')
const { Schema, model } = mongoose

const emotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Happy',
      'Sad',
      'Excited',
      'Calm',
      'Fearful',
      'Angry',
      'Joyful',
      'Anxious',
      'Hopeful',
      'Confused',
      'Lonely',
      'Grateful',
      'Surprised',
      'Content',
      'Nostalgic'
    ]
  }
})

const Emotion = model('Emotion', emotionSchema)

module.exports = Emotion
