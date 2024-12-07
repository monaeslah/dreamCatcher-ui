const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const User = require('../models/User.model')

const saltRounds = 10

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, username, role } = req.body

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: 'Provide email, password, and username' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Provide a valid email address.' })
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.'
      })
    }

    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(400).json({ message: 'User already exists.' })
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      username,
      role
    })
    const { _id } = createdUser
    const payload = { _id, email, username }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '6h'
    })

    res.status(201).json({ user: { _id, email, username }, authToken })
  } catch (error) {
    console.error('Error in signup route:', error.message)
    next(error)
  }
})

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  // Check if email or password are provided as empty string
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password.' })
    return
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then(foundUser => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: 'User not found.' })
        return
      }
      console.log('Stored hash:', foundUser.password)
      console.log('Provided password:', password)
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
      console.log('Provided password:', passwordCorrect)

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, username, role } = foundUser
        console.log(req.body, foundUser, passwordCorrect)

        // Create an object that will be set as the token payload
        const payload = { _id, email, username, role }

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h'
        })

        // Send the token as the response
        res.status(200).json({
          authToken: authToken,
          user: {
            _id,
            email,
            username,
            role
          }
        })
      } else {
        res.status(401).json({ message: 'Unable to authenticate the user' })
      }
    })
    .catch(err => next(err)) // In this case, we send error handling to the error handling middleware.
})

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload)
})

module.exports = router
