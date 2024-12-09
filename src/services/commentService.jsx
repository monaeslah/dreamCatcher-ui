import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/comments`

export const fetchComments = async dreamId => {
  const response = await axios.get(`${API_URL}/dream/${dreamId}`)
  return response.data
}

export const addComment = async (dreamId, text) => {
  const response = await axios.post(API_URL, { dreamId, text })
  return response.data
}

export const updateComment = async (commentId, text) => {
  const response = await axios.put(`${API_URL}/${commentId}`, { text })
  return response.data
}

export const deleteComment = async commentId => {
  await axios.delete(`${API_URL}/${commentId}`)
}
