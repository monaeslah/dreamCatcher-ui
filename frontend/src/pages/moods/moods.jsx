import { useState, useEffect } from 'react'
import { fetchMoodData, addMoodData } from '../../services/moods'

const MoodTrackerPage = () => {
  // States for moods and form data
  const [moods, setMoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    mood: '',
    description: '',
    date: '',

    intensity: ''
  })

  // Fetch existing moods on component load
  useEffect(() => {
    const loadMoods = async () => {
      try {
        const data = await fetchMoodData()
        setMoods(data)
      } catch (err) {
        console.error('Failed to fetch moods', err)
      } finally {
        setLoading(false)
      }
    }

    loadMoods()
  }, [])

  // Handle input changes in the form
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'intensity' ? Number(value) : value
    }))
  }

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newMood = await addMoodData(formData)
      setMoods(prevMoods => [...prevMoods, newMood])
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
        ) : moods.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {moods.map((mood, index) => (
              <li
                key={index}
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
            ))}
          </ul>
        ) : (
          <p>No moods logged yet.</p>
        )}
      </div>
    </div>
  )
}

export default MoodTrackerPage
