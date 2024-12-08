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
      enum: ['happy', 'sad', 'angry', 'anxious', 'excited', 'calm', 'neutral'],
      required: true
    },
    color: {
      type: String,
      required: true,
      validate: {
        validator: function (color) {
          const moodColorMap = {
            happy: ['#FFF9C4', '#FFF176', '#FBC02D'],
            sad: ['#BBDEFB', '#64B5F6', '#1976D2'],
            angry: ['#FFCDD2', '#E57373', '#D32F2F'],
            anxious: ['#E1BEE7', '#BA68C8', '#7B1FA2'],
            excited: ['#FFE0B2', '#FFB74D', '#F57C00'],
            calm: ['#C8E6C9', '#81C784', '#388E3C'],
            neutral: ['#E0E0E0', '#BDBDBD', '#616161']
          }

          const intensity = this.intensity || 5 // Default to medium intensity
          let expectedColor

          if (intensity <= 3) {
            expectedColor = moodColorMap[this.mood.toLowerCase()][0]
          } else if (intensity <= 7) {
            expectedColor = moodColorMap[this.mood.toLowerCase()][1]
          } else {
            expectedColor = moodColorMap[this.mood.toLowerCase()][2]
          }

          return color === expectedColor
        },
        message: 'Color does not match the mood and intensity.'
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
