const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Dream = require('../models/Dream.model.js')

router.get('/analysis/emotions', isAuthenticated, (req, res, next) => {
  Dream.aggregate([
    { $unwind: '$emotions' },
    {
      $lookup: {
        from: 'emotions',
        localField: 'emotions',
        foreignField: '_id',
        as: 'emotionDetails'
      }
    },
    { $unwind: '$emotionDetails' },
    {
      $group: {
        _id: '$emotionDetails.name',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        emotion: '$_id',
        count: 1
      }
    }
  ])
    .then(result => res.status(200).json(result))
    .catch(err => next(err))
})

router.get('/analysis/tags', isAuthenticated, (req, res, next) => {
  Dream.aggregate([
    { $unwind: '$tags' },
    {
      $lookup: {
        from: 'tags',
        localField: 'tags',
        foreignField: '_id',
        as: 'tagDetails'
      }
    },
    { $unwind: '$tagDetails' },
    {
      $group: {
        _id: '$tagDetails.name',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        tag: '$_id',
        count: 1
      }
    }
  ])
    .then(result => res.status(200).json(result))
    .catch(error => next(error))
})

router.get('/analysis/trends', isAuthenticated, (req, res, next) => {
  Dream.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ])
    .then(result => {
      if (result.length === 0) {
        return res.status(200).json({ message: 'No trend data available.' })
      }
      res.status(200).json(result)
    })
    .catch(error => next(error))
})

module.exports = router
