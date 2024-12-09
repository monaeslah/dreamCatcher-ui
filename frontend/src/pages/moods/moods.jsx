import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Calendar from './calendar'
import { useMoodContext } from '../../context/moodContext'
import { useAuthContext } from '../../context/authContext'
import MoodLegend from './moodcolors'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers'
const MoodTrackerPage = () => {
  const { fetchMoodData, addMoodData, moods } = useMoodContext()
  const { user } = useAuthContext()
  const [moodsArray, setMoodsArray] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    mood: '',
    description: '',
    date: '',
    intensity: ''
  })
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const loadMoods = async () => {
      await fetchMoodData()
      setLoading(false)
    }
    loadMoods()
  }, [])

  useEffect(() => {
    setMoodsArray(moods)
  }, [moods])

  const isDateAlreadyChosen = date => {
    return moodsArray.some(mood => {
      return (
        new Date(mood.date).toDateString() === new Date(date).toDateString()
      )
    })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'intensity' ? Number(value) : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (isDateAlreadyChosen(formData.date)) {
      setError(
        'A mood is already recorded for this date. You can only update it from the calendar.'
      )
      return
    }

    const newMood = { ...formData, userId: user._id }
    try {
      const addedMood = await addMoodData(newMood)
      setMoodsArray(prevMoods => [...prevMoods, addedMood])
      await fetchMoodData()

      setError('')
      setFormData({
        mood: '',
        description: '',
        date: '',
        intensity: ''
      })

      // Show success toast notification below the form
      toast.success('Mood successfully added to the calendar!', {
        position: 'bottom-center',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true
      })
    } catch (err) {
      console.error('Error adding mood:', err)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1024px', margin: 'auto' }}>
      <h1>Mood Tracker</h1>
      <p>Track your emotional journey over time.</p>

      {/* Form Section */}
      <div
        style={{
          marginBottom: '2rem',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      >
        <h2>Log a New Mood</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              <TextField
                name='mood'
                select
                value={formData.mood}
                onChange={handleInputChange}
                fullWidth
                margin='normal'
                required
                SelectProps={{
                  native: true
                }}
              >
                <option value=''>Select Mood</option>
                <option value='happy'>Happy</option>
                <option value='sad'>Sad</option>
                <option value='angry'>Angry</option>
                <option value='anxious'>Anxious</option>
                <option value='excited'>Excited</option>
                <option value='calm'>Calm</option>
                <option value='neutral'>Neutral</option>
              </TextField>
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Description:
              <TextField
                label='Describe your mood'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                required
                fullWidth
                multiline
                rows={4}
                margin='normal'
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Date'
                value={formData.date}
                onChange={newDate =>
                  setFormData(prevData => ({
                    ...prevData,
                    date: newDate
                  }))
                }
                renderInput={params => (
                  <TextField {...params} fullWidth margin='normal' required />
                )}
              />
            </LocalizationProvider>

            <TextField
              label='Intensity(1-10)'
              name='intensity'
              type='number'
              value={formData.intensity}
              onChange={handleInputChange}
              required
              inputProps={{
                min: 1,
                max: 10
              }}
            />
          </div>
          <button
            type='submit'
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#c5d1fead',
              border: 'none'
            }}
          >
            Save Mood
          </button>
          <p>{error}</p>
        </form>
        <ToastContainer />
      </div>

      {/* Calendar and Legend Section */}
      <div style={{ display: 'flex', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <Calendar moods={moodsArray} setSelectedDate={setSelectedDate} />
        </div>

        <div style={{ display: 'flex', alignItems: 'start' }}>
          <div style={{ flex: 1 }}></div>
          <MoodLegend />
        </div>
      </div>
    </div>
  )
}

export default MoodTrackerPage
