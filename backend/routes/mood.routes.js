const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Moods = require('../models/mood.model.js')
router.get('/moods', isAuthenticated, async (req, res, next) => {
  try {
    const moods = await Moods.find({ userId: req.user._id }).sort({ date: -1 })
    res.status(200).json(moods)
  } catch (error) {
    console.error('Error fetching moods:', error.message)
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
})
router.post('/moods', isAuthenticated, async (req, res, next) => {
  const { mood, description, intensity, date } = req.body
  if (!mood || !description || !intensity) {
    return res
      .status(400)
      .json({ message: 'Mood, description, and intensity are required.' })
  }

  const moodColorMap = {
    happy: ['#E6D1FF', '#D1A6FF', '#B473FF'],
    sad: ['#A7C9FF', '#82A9FF', '#4D8AC5'],
    angry: ['#FFDDC1', '#FFABAB', '#FF6F6F'],
    anxious: ['#FFF9C4', '#FFE082', '#FFB300'],
    excited: ['#FFDBA3', '#FF9E58', '#FF6F00'],
    calm: ['#C5E1A5', '#A5D6A7', '#66BB6A'],
    neutral: ['#DCDCDC', '#BDBDBD', '#8C8C8C']
  }
  // Determine color based on intensity
  const intensityIndex = intensity <= 3 ? 0 : intensity <= 7 ? 1 : 2
  const color = moodColorMap[mood.toLowerCase()][intensityIndex]

  Moods.create({
    userId: req.user._id,
    mood,
    description,
    date,
    color,
    intensity
  })
    .then(newMood => {
      res
        .status(201)
        .json({ message: 'Mood created successfully!', mood: newMood })
    })
    .catch(error => {
      console.error('Error in Mood creation route:', error.message)
      next(error)
    })
})

router.put('/moods/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { mood, intensity } = req.body

    const moodColorMap = {
      happy: ['#FFF9C4', '#FFF176', '#FBC02D'],
      sad: ['#BBDEFB', '#64B5F6', '#1976D2'],
      angry: ['#FFCDD2', '#E57373', '#D32F2F'],
      anxious: ['#E1BEE7', '#BA68C8', '#7B1FA2'],
      excited: ['#FFE0B2', '#FFB74D', '#F57C00'],
      calm: ['#C8E6C9', '#81C784', '#388E3C'],
      neutral: ['#E0E0E0', '#BDBDBD', '#616161']
    }

    // Determine color based on intensity
    const intensityIndex = intensity <= 3 ? 0 : intensity <= 7 ? 1 : 2
    const color = moodColorMap[mood.toLowerCase()][intensityIndex]

    const updatedMood = await Moods.findByIdAndUpdate(
      req.params.id,
      { ...req.body, color }, // Update the color field
      { new: true } // Return the updated document
    )

    res.status(200).json(updatedMood)
  } catch (error) {
    console.error('Error updating mood:', error.message)
    next(error)
  }
})

router.delete('/moods/:id', isAuthenticated, (req, res, next) => {
  Moods.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send()
    })
    .catch(error => {
      next(error)
    })
})
module.exports = router
