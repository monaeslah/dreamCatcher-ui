import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/moods`

export const fetchMoodData = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}

export const addMoodData = async mood => {
  const response = await axios.post(`${API_URL}`, mood)
  return response.data
}
