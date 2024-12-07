const mongoose = require('mongoose')
const { Schema, model } = mongoose

const moodSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    mood: {
      type: String,
      enum: ['happy', 'sad', 'angry', 'anxious', 'excited', 'neutral'],

      required: true
    },
    color: {
      type: String,
      required: true,
      validate: {
        validator: function (color) {
          const moodColorMap = {
            happy: 'yellow',
            sad: 'blue',
            angry: 'red',
            anxious: 'purple',
            excited: 'orange',
            neutral: 'gray'
          }
          return this.mood ? moodColorMap[this.mood] === color : true
        },
        message: 'Color does not match the mood.'
      }
    },
    intensity: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String,
      maxlength: 500
    }
  },
  { timestamps: true }
)

moodSchema.index({ userId: 1, date: -1 })

const Mood = model('Mood', moodSchema)

module.exports = Mood
