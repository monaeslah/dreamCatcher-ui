import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { Avatar } from '@mui/material'
import logo from '../assets/images/Logo.png'
const NavbarData = [
  {
    title: 'Login',
    icon: null,
    link: '/login',
    protected: false
  },
  {
    title: 'Sign Up',
    icon: null,
    link: '/signup',
    protected: false
  }
]

function Navbar () {
  const { user, logout } = useAuthContext()

  const filteredNavbarData = NavbarData.filter(item => {
    if (user) {
      return item.title !== 'Sign Up' && item.title !== 'Login'
    } else {
      return item.title !== 'Logout' && !item.protected
    }
  })

  return (
    <nav>
      <div className='navbar-logo'>
        <Link to='/'>
          {' '}
          <img src={logo} alt='DreamCatcher Logo' />
        </Link>
      </div>

      <ul className='navbar-links'>
        {filteredNavbarData.map((item, index) => (
          <li key={index} className='navbar-item'>
            {item.link === '/logout' ? (
              <button onClick={logout} className='navbar-link'>
                {item.icon}
                <span>{item.title}</span>
              </button>
            ) : (
              <a href={item.link} className='navbar-link'>
                {item.icon}
                <span>{item.title}</span>
              </a>
            )}
          </li>
        ))}
      </ul>

      {user && (
        <Link to='/profile'>
          <div className='navbar-user-info'>
            <span className='navbar-username'>{user.username}</span>
            <Avatar
              src={user.profileImageUrl || 'https://via.placeholder.com/150'}
              alt='User Avatar'
            />
          </div>
        </Link>
      )}
    </nav>
  )
}

export default Navbar
