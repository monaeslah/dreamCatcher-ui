import { useState } from 'react'

import { useAuthContext } from '../context/authContext'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import InputField from '../components/common/inputField'
import DreamButton from '../components/common/button'
import Login from './login'

import Over_the_Rhone from '../assets/images/Over_the_Rhone.jpg'

const SignUpPage = () => {
  const { signUp, feedBackSignUp } = useAuthContext()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState()
  const [login, setLogin] = useState(true)
  const redirectLogin = () => {
    setLogin(false)
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    if (name === 'username') setUserName(value)
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!userName || !email || !password || !confirmPassword) {
      setError('All fields are required!')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }
    const userData = {
      email,
      username: userName,
      password
    }

    try {
      await signUp(userData)
      setError(feedBackSignUp)
      // setSuccess('Account created successfully!')
    } catch (err) {
      setError(err.message || 'Failed to create account.')
    }
  }

  return (
    <>
      {login ? (
        <div id='login-form'>
          <div className='form-area'>
            <form onSubmit={handleSubmit}>
              <div className='input-login'>
                <InputField className='inputField mediumInput'>
                  <PersonIcon className='icon' />
                  <input
                    type='text'
                    id='username'
                    name='username'
                    required
                    value={userName}
                    placeholder='Create a username '
                    onChange={handleInputChange}
                  />
                </InputField>

                <InputField className='inputField mediumInput'>
                  <EmailIcon className='icon' />
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    placeholder='Enter a valid email'
                    value={email}
                    onChange={handleInputChange}
                  />
                </InputField>
                <InputField className='inputField mediumInput'>
                  <LockIcon className='icon' />
                  <input
                    type='password'
                    id='password'
                    name='password'
                    required
                    placeholder='Create a password'
                    value={password}
                    onChange={handleInputChange}
                  />
                </InputField>

                <InputField className='inputField mediumInput'>
                  <LockIcon className='icon' />
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    required
                    placeholder='Repeat created password'
                    value={confirmPassword}
                    onChange={handleInputChange}
                  />
                </InputField>

                <DreamButton
                  label='Sign up'
                  enable={true}
                  size='medium'
                  className={'primary-btn'}
                  onClick={handleSubmit}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <p>
                  Already have account?
                  <p onClick={redirectLogin} className='underline'>
                    Click here
                  </p>
                </p>
              </div>
            </form>
            <div className='image-firm'>
              <img src={Over_the_Rhone} alt='stary night painting' />
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export default SignUpPage
