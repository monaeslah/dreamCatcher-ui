const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Moods = require('../models/mood.model.js')
router.get('/moods', isAuthenticated, async (req, res, next) => {
  try {
    const userMood = await Moods.find({ userId: req.user._id })

    res.status(200).json(userMood)
  } catch (error) {
    next(error)
  }
})
router.post('/moods', isAuthenticated, async (req, res, next) => {
  const { mood, description, color, intensity, date } = req.body
  if (!mood || !description || !color) {
    return res
      .status(400)
      .json({ message: 'Mood, description, and color are required.' })
  }
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

router.put('/moods/:id', isAuthenticated, (req, res, next) => {
  Moods.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedMood => {
      res.status(200).json(updatedMood)
    })
    .catch(error => {
      next(error)
    })
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
