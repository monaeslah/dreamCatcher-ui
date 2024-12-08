import { useState, useEffect } from 'react'
import { useMoodContext } from '../../context/moodContext'
import { useAuthContext } from '../../context/authContext'

const MoodTrackerPage = () => {
  const { fetchMoodData, addMoodData, moods } = useMoodContext()
  const { user } = useAuthContext()
  const [moodsArray, setMoodsArray] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    mood: '',
    description: '',
    date: '',

    intensity: ''
  })

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
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'intensity' ? Number(value) : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const newMood = { ...formData, userId: user._id }
    try {
      await addMoodData(newMood)
      setFormData({
        mood: '',
        description: '',
        date: '',
        intensity: ''
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
              Mood:
              <select
                name='mood'
                value={formData.mood}
                onChange={handleInputChange}
                required
              >
                <option value=''>Select Mood</option>
                <option value='happy'>Happy</option>
                <option value='sad'>Sad</option>
                <option value='angry'>Angry</option>
                <option value='anxious'>Anxious</option>
                <option value='excited'>Excited</option>
                <option value='calm'>Calm</option>
                <option value='neutral'>Neutral</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Description:
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Describe your mood'
                required
              ></textarea>
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Date:
              <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Intensity (1-10):
              <input
                type='number'
                name='intensity'
                value={formData.intensity}
                onChange={handleInputChange}
                min='1'
                max='10'
                required
              />
            </label>
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
        </form>
      </div>

      {/* Display Existing Moods */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Your Mood History</h2>
        {loading ? (
          <p>Loading moods...</p>
        ) : moodsArray.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {moodsArray.map((mood, index) => {
              return (
                <li
                  key={mood._id || index}
                  style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: mood.color || '#f9f9f9'
                  }}
                >
                  <h3>{mood.mood}</h3>
                  <p>
                    <strong>Description:</strong> {mood.description}
                  </p>
                  <p>
                    <strong>Date:</strong>{' '}
                    {new Date(mood.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Intensity:</strong> {mood.intensity}
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No moods logged yet.</p>
        )}
      </div>
    </div>
  )
}

export default MoodTrackerPage
