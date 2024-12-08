import { useState } from 'react'
import { useAuthContext } from '../context/authContext'

import Over_the_Rhone from '../assets/images/Over_the_Rhone.jpg'
import SignUpPage from './signUpPage'
import InputField from '../components/common/inputField'
import DreamButton from '../components/common/button'
import passwordIcon from '../assets/images/password.svg'
import emailIcon from '../assets/images/email.svg'
import hideIcon from '../assets/images/visibility_off.svg'
import showIcon from '../assets/images/visibility_on.svg'
const Login = () => {
  const { login, feedBackLogin } = useAuthContext()
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [active, setActive] = useState(true)
  const redirectSignup = () => {
    setActive(false)
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await login(form)

    //
  }

  return (
    <>
      {active ? (
        <div id='login-form'>
          <div className='form-area'>
            <form onSubmit={handleSubmit}>
              <div className='input-login'>
                <h3>Login</h3>

                <InputField
                  iconBefore={emailIcon}
                  className='inputField mediumInput'
                  // label='Email'
                >
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </InputField>

                <InputField
                  iconBefore={passwordIcon}
                  className='inputField mediumInput'
                  // label='Password'
                >
                  <input
                    type={`${showPassword ? 'text' : 'password'}`}
                    id='password'
                    name='password'
                    required
                    value={form.password}
                    onChange={handleInputChange}
                  />
                  <img
                    src={showPassword ? showIcon : hideIcon}
                    alt={showPassword ? 'Show password' : 'Hide password'}
                    onClick={() => setShowPassword(!showPassword)}
                    className='passwordToggleIcon'
                  />
                </InputField>

                <DreamButton
                  label='Submit'
                  enable={true}
                  size='medium'
                  className={'primary-btn'}
                  onClick={handleSubmit}
                />

                <p>
                  Create an account?
                  <p onClick={redirectSignup} className='underline'>
                    Click here
                  </p>
                </p>
                <p>{feedBackLogin}</p>
              </div>
            </form>

            <div className='image-firm'>
              <img src={Over_the_Rhone} alt='stary night painting' />
            </div>
          </div>
        </div>
      ) : (
        <SignUpPage />
      )}
    </>
  )
}

export default Login
