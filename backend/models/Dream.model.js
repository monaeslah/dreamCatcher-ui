const mongoose = require('mongoose')
const { Schema, model } = mongoose

const dreamSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  emotions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Emotion'
    }
  ],
  emotionDetails: { type: String },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],

  isPublic: {
    type: Boolean,
    default: false
  },

  imageUrl: {
    type: String
  }
})

const Dream = model('Dream', dreamSchema)

module.exports = Dream
