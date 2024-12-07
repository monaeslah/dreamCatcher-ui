const express = require('express')
const router = express.Router()
const Comments = require('../models/Comment.model.js')
const Dreams = require('../models/Dream.model.js') // Import the Dreams model

const { isAuthenticated } = require('../middleware/jwt.middleware.js')

// GET all comments for a specific dream

router.get('/comments/dream/:dreamId', isAuthenticated, (req, res, next) => {
  Comments.find({ dreamId: req.params.dreamId })
    .populate('userId', 'username')
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(error => {
      next(error)
    })
})

// Create a new comment

router.post('/comments', isAuthenticated, async (req, res, next) => {
  try {
    const { dreamId, text } = req.body

    // Validate required fields
    if (!dreamId || !text) {
      return res.status(400).json({ error: 'Dream ID and text are required.' })
    }

    const dream = await Dreams.findById(dreamId)
    if (!dream) {
      return res.status(404).json({ error: 'Dream not found.' })
    }

    const isUserAuthorizedToComment =
      dream.isPublic || dream.userId.toString() === req.user._id

    if (!isUserAuthorizedToComment) {
      return res.status(403).json({ error: 'Access denied.' })
    }
    const newComment = await Comments.create({
      dreamId,
      userId: req.user._id,
      text,
      date: new Date()
    })

    res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
})

// update a comment by ID
// PUT: Update a comment by ID
router.put('/comments/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params
    const { text } = req.body

    // Find the comment
    const comment = await Comments.findById(id)
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' })
    }

    // Check if the user owns the comment
    if (comment.userId.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ error: 'Not authorized to update this comment.' })
    }

    // Update the comment
    comment.text = text || comment.text
    const updatedComment = await comment.save()

    res.status(200).json(updatedComment)
  } catch (error) {
    next(error)
  }
})

// DELETE: Delete a comment by ID
router.delete('/comments/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params

    // Find the comment
    const comment = await Comments.findById(id)
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' })
    }

    // Check if the user owns the comment
    if (comment.userId.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ error: 'Not authorized to delete this comment.' })
    }

    // Delete the comment
    await comment.deleteOne()

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
