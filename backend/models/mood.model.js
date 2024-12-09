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
            happy: ['#E6D1FF', '#D1A6FF', '#B473FF'],
            sad: ['#A7C9FF', '#82A9FF', '#4D8AC5'],
            angry: ['#FFDDC1', '#FFABAB', '#FF6F6F'],
            anxious: ['#FFF9C4', '#FFE082', '#FFB300'],
            excited: ['#FFDBA3', '#FF9E58', '#FF6F00'],
            calm: ['#C5E1A5', '#A5D6A7', '#66BB6A'],
            neutral: ['#DCDCDC', '#BDBDBD', '#8C8C8C']
          }
          const intensity = this.intensity || 5
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
