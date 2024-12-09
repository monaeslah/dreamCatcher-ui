import axios from 'axios'

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`

/**
ths
 */
export const fetchMoodAnalysis = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analysis/moods`)
    return response.data
  } catch (error) {
    console.error('Error fetching mood analysis:', error)
    throw error
  }
}
export const fetchMoodMonthlyAnalysis = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analysis/moods/monthly`)
    return response.data
  } catch (error) {
    console.error('Error fetching monthly mood analysis:', error)
    throw error
  }
}
export const fetchMoodDailyTrends = async month => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/analysis/moods/daily/${month}`
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching daily mood trends for ${month}:`, error)
    throw error
  }
}
