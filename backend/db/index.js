const mongoose = require('mongoose')
const Emotion = require('../models/Emotion.model')
const Tags = require('../models/Tag.Model')

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dreamcatcher-backend'

async function seedEmotions () {
  const emotions = [
    { name: 'Happy' },
    { name: 'Sad' },
    { name: 'Excited' },
    { name: 'Calm' },
    { name: 'Fearful' },
    { name: 'Angry' },
    { name: 'Joyful' },
    { name: 'Anxious' },
    { name: 'Hopeful' },
    { name: 'Confused' },
    { name: 'Lonely' },
    { name: 'Grateful' },
    { name: 'Surprised' },
    { name: 'Content' },
    { name: 'Nostalgic' }
  ]

  try {
    for (const emotion of emotions) {
      await Emotion.updateOne(
        { name: emotion.name },
        { $set: emotion },
        { upsert: true }
      )
    }
    console.log('Emotions seeded successfully.')
  } catch (err) {
    console.error('Error seeding emotions:', err)
    throw err
  }
}

async function seedTags () {
  const tags = [
    { name: 'Flying' },
    { name: 'Water' },
    { name: 'Animals' },
    { name: 'Nightmare' },
    { name: 'Adventure' },
    { name: 'Friends' },
    { name: 'Family' },
    { name: 'Work' },
    { name: 'School' },
    { name: 'Travel' },
    { name: 'Fantasy' },
    { name: 'Love' },
    { name: 'Death' },
    { name: 'Unknown' },
    { name: 'Repetition' }
  ]

  try {
    for (const tag of tags) {
      await Tags.updateOne({ name: tag.name }, { $set: tag }, { upsert: true })
    }
    console.log('Tags seeded successfully.')
  } catch (error) {
    console.error('Error seeding tags:', error)
    throw error
  }
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB.')

    // Seed data only once at startup
    try {
      await seedEmotions()
      await seedTags()
    } catch (err) {
      console.error('Error during seeding:', err)
    }

    // Keep the connection open for the API
    console.log('Database seeded. Connection remains open for API.')
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err)
  })
