const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const Dream = require('../models/Dream.model')
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const isAdmin = require('../middleware/role.middleware')

router.get('/profile', isAuthenticated, (req, res, next) => {
  const userId = req.user._id

  User.findById(userId, '-password')
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found.' })
      }
      res.status(200).json(user) // Respond with user data
    })
    .catch(error => {
      console.error('Error fetching user profile:', error) // Debugging: Log error
      next(error) // Pass the error to the next middleware (error handler)
    })
})

router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id
    const { username, email, profileImageUrl } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, profileImageUrl },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' })
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile.', error })
  }
})

router.get('/admin/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password')
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.', error })
  }
})

router.delete(
  '/admin/users/:id',
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' })
      }
      res.status(200).json({ message: 'User deleted successfully.' })
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user.', error })
    }
  }
)

router.get('/admin/dreams', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const publicDreams = await Dream.find({ isPublic: true }).populate(
      'user',
      'username email'
    )
    res.status(200).json(publicDreams)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public dreams.', error })
  }
})

module.exports = router
