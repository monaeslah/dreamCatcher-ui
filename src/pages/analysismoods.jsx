import { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
  fetchMoodAnalysis,
  fetchMoodMonthlyAnalysis,
  fetchMoodDailyTrends
} from '../services/analysisMoodService'

const moodColorMap = {
  happy: '#B473FF',
  sad: '#4D8AC5',
  angry: '#FF6F6F',
  anxious: '#FFB300',
  excited: '#FF6F00',
  calm: '#66BB6A',
  neutral: '#BDBDBD'
}

const MoodAnalysis = () => {
  const [moodData, setMoodData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [dailyTrends, setDailyTrends] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  )
  const [error, setError] = useState(null)
  const [showPieChart, setShowPieChart] = useState(true)

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

  // Pie Chart Data
  const pieChartData = {
    labels: moodData.map(item => item.mood),
    datasets: [
      {
        data: moodData.map(item => item.count),
        backgroundColor: moodData.map(item => moodColorMap[item.mood])
      }
    ]
  }

  // Bar Chart Data
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

  const dailyTrendChartData = {
    labels: allDays.map(day => `D-${day}`),
    datasets: dailyTrends.map(trend => ({
      label: trend.mood,
      data: allDays.map(day => {
        const moodRecord = trend.values.find(v => v.date === day)
        return moodRecord ? moodRecord.intensity : 0
      }),
      backgroundColor: moodColorMap[trend.mood] || '#CCCCCC',
      borderColor: moodColorMap[trend.mood] || '#AAAAAA',
      borderWidth: 1
    }))
  }

  return (
    <div>
      <h3>Mood Analysis</h3>

      <div>
        <div className='subtitle1'>Overall Mood Distribution</div>
        <label className='toggle-switch'>
          <input
            type='checkbox'
            checked={showPieChart}
            onChange={() => setShowPieChart(prev => !prev)}
          />
          <span className='slider' />
        </label>
        <span>{showPieChart ? 'Pie Chart' : 'Bar Chart'}</span>
        <div className='chart-container'>
          {showPieChart ? (
            <div className='pie-chart chart-item'>
              <Pie data={pieChartData} />
            </div>
          ) : (
            <div className='chart-item bar-chart'>
              <Bar data={barChartData} />
            </div>
          )}
        </div>
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
