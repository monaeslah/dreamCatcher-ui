import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)
  const [feedBackLogin, setFeedBackLogin] = useState('')
  const [feedBackSignUp, setFeedBackSignUp] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
  }, [token])

  const login = async form => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        form
      )
      const authToken = res.data.authToken
      const userData = res.data.user

      setToken(authToken)
      setUser(userData)

      navigate('/mine-dreams')
      localStorage.setItem('authToken', authToken)
      localStorage.setItem('user', JSON.stringify(userData))

      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
    } catch (error) {
      console.error('Login failed:', error)
      console.log('login error', error)
      setFeedBackLogin('user not found.')
    }
  }
  const signUp = async userData => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        userData
      )

      const authToken = res.data.authToken
      const userDataResponse = res.data.user

      // Save token and user data
      setToken(authToken)
      setUser(userDataResponse)
      console.log(authToken)

      localStorage.setItem('authToken', authToken)
      localStorage.setItem('user', JSON.stringify(userDataResponse))

      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      setTimeout(() => {
        navigate('/mine-dreams')
      }, 100)

      return {
        success: true,
        message: 'Sign-up successful! You can now log in.'
      }
    } catch (error) {
      console.error('Sign-up failed:', error)

      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred.'

      setFeedBackSignUp(errorMessage)

      return { success: false, message: errorMessage }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        feedBackLogin,
        signUp,
        feedBackSignUp
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
