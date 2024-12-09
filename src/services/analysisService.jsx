import axios from 'axios'

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`

export const fetchEmotionsAnalysis = async () => {
  const response = await axios.get(`${API_BASE_URL}/analysis/emotions`, {})
  console.log(response)
  return response.data
}

export const fetchTagsAnalysis = async () => {
  const response = await axios.get(`${API_BASE_URL}/analysis/tags`, {})
  return response.data
}

export const fetchTrendsAnalysis = async () => {
  const response = await axios.get(`${API_BASE_URL}/analysis/trends`, {})
  return response.data
}
