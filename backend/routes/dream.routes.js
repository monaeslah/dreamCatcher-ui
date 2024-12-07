const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Dreams = require('../models/Dream.model.js')

router.get('/dreams/public', isAuthenticated, async (req, res, next) => {
  const { tags, emotions, startDate, endDate } = req.query
  const filter = { isPublic: true }

  if (tags) filter.tags = { $in: tags.split(',') }
  if (emotions) filter.emotions = { $in: emotions.split(',') }
  if (startDate || endDate) {
    filter.date = {}
    if (startDate) filter.date.$gte = new Date(startDate)
    if (endDate) filter.date.$lte = new Date(endDate)
  }
  res.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  res.set('Surrogate-Control', 'no-store')
  Dreams.find(filter)

  try {
    const publicDreams = await Dreams.find(filter)
    res.status(200).json(publicDreams)
  } catch (error) {
    next(error)
  }
})

router.get('/dreams/mine', isAuthenticated, async (req, res, next) => {
  const { tags, emotions, startDate, endDate } = req.query
  const filter = { userId: req.user._id }
  if (tags) filter.tags = { $in: tags.split(',') }
  if (emotions) filter.emotions = { $in: emotions.split(',') }
  if (startDate || endDate) {
    filter.date = {}
    if (startDate) filter.date.$gte = new Date(startDate)
    if (endDate) filter.date.$lte = new Date(endDate)
  }
  res.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  res.set('Surrogate-Control', 'no-store')

  Dreams.find({ userId: req.user._id })
  try {
    const userDreams = await Dreams.find(filter)
    res.status(200).json(userDreams)
  } catch (error) {
    next(error)
  }
})

router.get('/dreams/:id', isAuthenticated, (req, res, next) => {
  Dreams.findById(req.params.id)
    .then(dream => {
      if (!dream) {
        return res.status(404).json({ message: 'Dream not found.' })
      }
      if (!dream.isPublic && dream.userId.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Access denied.' })
      }
      res.status(200).json(dream)
    })
    .catch(error => {
      next(error)
    })
})

router.post('/dreams', isAuthenticated, (req, res, next) => {
  const { title, description, emotions, tags, isPublic, imageUrl, date } =
    req.body

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: 'User ID, title, and description are required.' })
  }

  Dreams.create({
    userId: req.user._id,
    title,
    description,
    date,
    emotions,
    tags,
    isPublic,
    imageUrl
    // colors,
    // emotionDetails,
  })
    .then(newDream => {
      res
        .status(201)
        .json({ message: 'Dream created successfully!', dream: newDream })
    })
    .catch(error => {
      console.error('Error in dream creation route:', error.message)
      next(error)
    })
})
router.put('/dreams/:id', isAuthenticated, (req, res, next) => {
  Dreams.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedDream => {
      res.status(200).json(updatedDream)
    })
    .catch(error => {
      next(error)
    })
})
router.delete('/dreams/:id', isAuthenticated, (req, res, next) => {
  Dreams.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send()
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router
