import { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
  fetchMoodAnalysis,
  fetchMoodMonthlyAnalysis,
  fetchMoodDailyTrends
} from '../services/analysisMoodService'

const moodColorMap = {
  happy: '#FFF9C4',
  sad: '#BBDEFB',
  angry: '#FFCDD2',
  anxious: '#E1BEE7',
  excited: '#FFE0B2',
  calm: '#C8E6C9',
  neutral: '#E0E0E0'
}

const MoodAnalysis = () => {
  const [moodData, setMoodData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [dailyTrends, setDailyTrends] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // Default to current month
  )
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moods = await fetchMoodAnalysis()
        const monthly = await fetchMoodMonthlyAnalysis()
        setMoodData(moods)
        setMonthlyData(monthly)
      } catch (err) {
        console.error('Error fetching mood analysis:', err)
        setError('Failed to fetch mood analysis data.')
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (selectedMonth) {
      const fetchDailyData = async () => {
        try {
          const dailyTrends = await fetchMoodDailyTrends(selectedMonth)
          setDailyTrends(dailyTrends)
        } catch (err) {
          console.error('Error fetching daily trends:', err)
          setError('Failed to fetch daily mood trends.')
        }
      }

      fetchDailyData()
    }
  }, [selectedMonth])

  if (error) {
    return <p>{error}</p>
  }

  // Helper: Get all days in the month
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1)
    const days = []
    while (date.getMonth() === month) {
      days.push(date.getDate())
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  // Parse selected month
  const [selectedYear, selectedMonthIndex] = selectedMonth
    .split('-')
    .map(Number)
  const allDays = getDaysInMonth(selectedYear, selectedMonthIndex - 1)

  // Daily Trends Bar Chart
  const dailyTrendChartData = {
    labels: allDays.map(day => `Day ${day}`), // Generate labels for all days
    datasets: dailyTrends.map(trend => ({
      label: trend.mood,
      data: allDays.map(day => {
        const moodRecord = trend.values.find(v => v.date === day)
        return moodRecord ? moodRecord.intensity : 0 // Default to 0 if no data
      }),
      backgroundColor: moodColorMap[trend.mood] || '#CCCCCC',
      borderColor: moodColorMap[trend.mood] || '#AAAAAA',
      borderWidth: 1
    }))
  }

  // Pie Chart
  const pieChartData = {
    labels: moodData.map(item => item.mood),
    datasets: [
      {
        data: moodData.map(item => item.count),
        backgroundColor: moodData.map(item => moodColorMap[item.mood])
      }
    ]
  }
  const barChartData = {
    labels: moodData.map(item => item.mood),
    datasets: [
      {
        label: 'Mood Count',
        data: moodData.map(item => item.count),
        backgroundColor: moodData.map(item => moodColorMap[item.mood]),
        borderColor: moodData.map(item => moodColorMap[item.mood]),
        borderWidth: 1
      }
    ]
  }
  return (
    <div>
      <h3>Mood Analysis</h3>
      {/* Pie Chart */}
      <div>
        <h4>Overall Mood Distribution</h4>
        <Pie data={pieChartData} />
      </div>

      <div>
        <h4>Mood Distribution for Selected Month</h4>
        <label>
          Select Month:
          <select
            onChange={e => setSelectedMonth(e.target.value)}
            value={selectedMonth}
          >
            {monthlyData.map(item => (
              <option
                key={`${item._id.year}-${item._id.month}`}
                value={`${item._id.year}-${item._id.month}`}
              >
                {item._id.year}-{item._id.month}
              </option>
            ))}
          </select>
        </label>
        {barChartData ? (
          <Bar data={barChartData} />
        ) : (
          <p>Select a month to view mood data.</p>
        )}
      </div>
      <div>
        <h4>Daily Mood Tracker</h4>
        <label>
          Select Month:
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            {monthlyData.map(item => (
              <option
                key={`${item._id.year}-${item._id.month}`}
                value={`${item._id.year}-${item._id.month}`}
              >
                {item._id.year}-{item._id.month}
              </option>
            ))}
          </select>
        </label>
        {dailyTrends.length > 0 ? (
          <Bar data={dailyTrendChartData} />
        ) : (
          <p>No data available for the selected month.</p>
        )}
      </div>
    </div>
  )
}

export default MoodAnalysis
