import { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { fetchMoodData } from '../../services/moods'

const MoodTrackerPage = () => {
  // States for chart data and filters
  const [moodTrendsData, setMoodTrendsData] = useState(null)
  const [emotionFrequencyData, setEmotionFrequencyData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    emotion: ''
  })

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchMoodData()
        setMoodTrendsData(data)
      } catch (err) {
        console.error('Failed to fetch moods', err)
      } finally {
        setLoading(false)
      }
    }

    loadComments()
  }, [])

  // Format mood trends data for Line chart
  const formatMoodTrendsData = data => ({
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood Trends',
        data: data.map(entry => entry.moodLevel),
        fill: false,
        backgroundColor: '#c5d1fead',
        borderColor: '#6b73ff'
      }
    ]
  })

  // Format emotion frequency data for Bar chart
  const formatEmotionFrequencyData = data => ({
    labels: data.map(entry => entry.emotion),
    datasets: [
      {
        label: 'Emotion Frequency',
        data: data.map(entry => entry.count),
        backgroundColor: '#c6fef2ce'
      }
    ]
  })

  // Update filters based on user input
  const handleFilterChange = e => {
    const { name, value } = e.target
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }))
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1024px', margin: 'auto' }}>
      <h1>Mood Tracker</h1>
      <p>Track your emotional journey over time.</p>

      {/* Filters */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label>
          Emotion:
          <select
            name='emotion'
            value={filters.emotion}
            onChange={handleFilterChange}
            style={{ margin: '0 1rem' }}
          >
            <option value=''>All</option>
            <option value='Happy'>Happy</option>
            <option value='Sad'>Sad</option>
            <option value='Anxious'>Anxious</option>
            <option value='Joyful'>Joyful</option>
            {/* Add more options as needed */}
          </select>
        </label>
      </div>

      {/* Mood Trends Chart */}
      {moodTrendsData && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Mood Trends Over Time</h2>
          <Line data={moodTrendsData} />
        </div>
      )}

      {/* Emotion Frequency Chart */}
      {emotionFrequencyData && (
        <div>
          <h2>Emotion Frequency</h2>
          <Bar data={emotionFrequencyData} />
        </div>
      )}
    </div>
  )
}

export default MoodTrackerPage
