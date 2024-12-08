import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { DreamProvider } from './context/dreamContext.jsx'
import { UserProvider } from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <UserProvider>
          <DreamProvider>
            <App />
          </DreamProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
)
