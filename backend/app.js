require('dotenv').config()
require('./db')
const express = require('express')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/api', indexRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const dreamRoutes = require('./routes/dream.routes')
app.use('/api', dreamRoutes)

const emotionRoutes = require('./routes/emotion.routes')
app.use('/api', emotionRoutes)

const commentRoutes = require('./routes/comment.routes')
app.use('/api', commentRoutes)

const analysisRoutes = require('./routes/analysis.routes')
app.use('/api', analysisRoutes)

const adminRoutes = require('./routes/admin.routes')
app.use('/api', adminRoutes)
const moodRoutes = require('./routes/mood.routes')
app.use('/api', moodRoutes)
require('./error-handling')(app)

module.exports = app
