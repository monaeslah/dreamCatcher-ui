import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api`

export const fetchMoodData = async () => {
  const response = await axios.get(`${API_URL}/mood-tracker`)
  return response.data
}
