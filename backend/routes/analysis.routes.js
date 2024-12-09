const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Dream = require('../models/Dream.model.js')
const Mood = require('../models/mood.model.js')

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
router.get('/analysis/moods', isAuthenticated, (req, res, next) => {
  Mood.aggregate([
    {
      $group: {
        _id: '$mood',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        mood: '$_id',
        count: 1,
        _id: 0
      }
    },
    {
      $sort: { count: -1 }
    }
  ])
    .then(result => res.status(200).json(result))
    .catch(err => next(err))
})

router.get(
  '/analysis/moods/monthly',
  isAuthenticated,
  async (req, res, next) => {
    const { startDate, endDate } = req.query
    const matchStage = {}
    if (startDate) matchStage.date = { $gte: new Date(startDate) }
    if (endDate)
      matchStage.date = { ...matchStage.date, $lte: new Date(endDate) }

    Mood.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            mood: '$mood'
          },
          avgIntensity: { $avg: '$intensity' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: { year: '$_id.year', month: '$_id.month' },
          moods: {
            $push: {
              mood: '$_id.mood',
              count: '$count',
              avgIntensity: '$avgIntensity'
            }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ])
      .then(result => res.status(200).json(result))
      .catch(err => next(err))
  }
)

router.get(
  '/analysis/moods/daily/:month',
  isAuthenticated,
  async (req, res, next) => {
    const { month } = req.params // Expecting format: 'YYYY-MM'
    const [year, monthIndex] = month.split('-').map(Number)

    const moodColorMap = {
      happy: '#FFF9C4',
      sad: '#BBDEFB',
      angry: '#FFCDD2',
      anxious: '#E1BEE7',
      excited: '#FFE0B2',
      calm: '#C8E6C9',
      neutral: '#E0E0E0'
    }

    try {
      const data = await Mood.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(year, monthIndex - 1, 1),
              $lte: new Date(year, monthIndex, 0)
            }
          }
        },
        {
          $group: {
            _id: { day: { $dayOfMonth: '$date' }, mood: '$mood' },
            avgIntensity: { $avg: '$intensity' }
          }
        },
        {
          $group: {
            _id: '$_id.mood',
            values: { $push: { date: '$_id.day', intensity: '$avgIntensity' } }
          }
        },
        {
          $addFields: {
            color: { $literal: moodColorMap['$_id'] }
          }
        },
        {
          $project: {
            mood: '$_id',
            values: 1,
            color: 1
          }
        }
      ])

      res.json(data)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
