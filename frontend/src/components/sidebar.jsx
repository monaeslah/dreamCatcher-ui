import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import PublicIcon from '@mui/icons-material/Public'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import LogoutIcon from '@mui/icons-material/Logout'

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, logout } = useAuthContext()

  return (
    <>
      <div className='mobile-nav'></div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className='sidebar-header'>
          <button className='sidebar-toggle-btn' onClick={toggleSidebar}>
            {isSidebarOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          </button>
        </div>
        <ul
          className={` ${
            isSidebarOpen ? 'sidebar-list-open' : 'sidebar-list-close'
          }`}
        >
          <li className='menu-item'>
            <Link to='/mine-dreams'>
              <AutoAwesomeIcon />
              {isSidebarOpen && <span>My Dreams</span>}
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/analysis'>
              <AutoGraphIcon />
              {isSidebarOpen && <span>Analytics</span>}
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/add-dream'>
              <AddBoxIcon />
              {isSidebarOpen && <span>Add New Dream</span>}
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/profile'>
              <AccountCircleIcon />
              {isSidebarOpen && <span>My Profile</span>}
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/public-dreams'>
              <PublicIcon />
              {isSidebarOpen && <span>Public Dreams</span>}
            </Link>
          </li>
        </ul>
        <div className='sidebar-footer'>
          <ul>
            <li className='menu-item' onClick={logout}>
              <Link to='/'>
                <LogoutIcon />
                {isSidebarOpen && <span>Logout</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
