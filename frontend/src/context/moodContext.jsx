import { createContext, useContext, useState, useEffect } from 'react'
import { useAuthContext } from './authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MoodContext = createContext()

export const useMoodContext = () => useContext(MoodContext)

const API_URL = `${import.meta.env.VITE_API_URL}/api/moods`

export const MoodProvider = ({ children }) => {
  const [moods, setMoods] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  const fetchMoodData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_URL)
      setMoods(response.data)

      setError(null)
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addMoodData = async mood => {
    try {
      const response = await axios.post(API_URL, mood)
      setMoods(prevMoods => [...prevMoods, response.data])
      setError(null)
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred')
    }
  }

  // Update mood
  const updateMoodData = async (moodId, updatedMood) => {
    try {
      const response = await axios.put(`${API_URL}/${moodId}`, updatedMood)
      setMoods(prevMoods =>
        prevMoods.map(mood => (mood._id === moodId ? response.data : mood))
      )
      setError(null)
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred')
    }
  }

  const deleteMoodData = async moodId => {
    try {
      await axios.delete(`${API_URL}/${moodId}`)
      setMoods(prevMoods => prevMoods.filter(mood => mood._id !== moodId))
      setError(null)
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchMoodData()
    }
  }, [isAuthenticated])

  return (
    <MoodContext.Provider
      value={{
        moods,
        loading,
        error,
        fetchMoodData,
        addMoodData,
        updateMoodData,
        deleteMoodData
      }}
    >
      {children}
    </MoodContext.Provider>
  )
}
