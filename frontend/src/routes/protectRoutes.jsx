import { Navigate } from 'react-router-dom'
import { useState } from 'react'

import { useAuthContext } from '../context/authContext'
import Sidebar from '../components/sidebar'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return token ? (
    <div className={`main-content ${token ? '' : 'no-sidebar'}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        style={{
          marginLeft: isSidebarOpen ? '275px' : '70px',
          transition: 'margin-left 0.3s ease',
          flex: 1
        }}
      >
        {children}
      </div>
    </div>
  ) : (
    <Navigate to='/' />
  )
}

export default ProtectedRoute
