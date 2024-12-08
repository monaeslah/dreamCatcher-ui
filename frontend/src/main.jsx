import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { DreamProvider } from './context/dreamContext.jsx'
import { UserProvider } from './context/userContext.jsx'
import { MoodProvider } from './context/moodContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <UserProvider>
          <DreamProvider>
            <MoodProvider>
              <App />
            </MoodProvider>
          </DreamProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
)
