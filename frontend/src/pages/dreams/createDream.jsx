import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import { useDreamContext } from '../../context/dreamContext'
import InputField from '../../components/common/inputField'
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Alert
} from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers'

const CreateDream = () => {
  const { user } = useAuthContext()
  const { tags, emotions, createDream, error, uploadImage } = useDreamContext()

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    emotions: [],
    tags: [],
    isPublic: false,
    imageUrl: ''
  })
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  }
  const handlePublicChange = e => {
    setForm(prevForm => ({
      ...prevForm,
      isPublic: e.target.value === 'true'
    }))
  }
  const handleImageUpload = async e => {
    const file = e.target.files[0]

    setWaitingForImageUrl(true)
    try {
      const imageUrl = await uploadImage(file)
      setForm(prevForm => ({ ...prevForm, imageUrl }))
    } catch (error) {
      console.error(error.message)
    } finally {
      setWaitingForImageUrl(false)
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()

    const dreamData = {
      ...form,
      userId: user._id
    }

    try {
      await createDream(dreamData)
      setConfirmation(true)
      setTimeout(() => setConfirmation(false), 3000)
      setConfirmation(true)
      setForm({
        title: '',
        description: '',
        date: '',
        emotions: [],
        tags: [],
        isPublic: false,
        imageUrl: ''
      })
      setTimeout(() => {
        navigate('/mine-dreams')
      }, 3000)
    } catch (error) {
      console.error('Error creating a new dream', error)
    }
  }

  return (
    <div id='create-dream'>
      <form onSubmit={handleSubmit} className='create-dream-form'>
        <h3>Create a New Dream</h3>

        {confirmation && (
          <Alert severity='success' className='confirmation-message'>
            Dream created successfully!
          </Alert>
        )}

        <div>
          <TextField
            label='Title'
            name='title'
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
            margin='normal'
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Date'
              value={form.date}
              onChange={newDate =>
                setForm(prevForm => ({
                  ...prevForm,
                  date: newDate
                }))
              }
              renderInput={params => (
                <TextField {...params} fullWidth margin='normal' />
              )}
            />
          </LocalizationProvider>
          <TextField
            label='Description'
            name='description'
            value={form.description}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={4}
            margin='normal'
          />
          <Autocomplete
            multiple
            options={emotions}
            getOptionLabel={option => option.name}
            value={form.emotions}
            onChange={(e, newValue) =>
              setForm(prevForm => ({
                ...prevForm,
                emotions: newValue
              }))
            }
            renderInput={params => (
              <TextField {...params} label='Emotions' margin='normal' />
            )}
          />
          <Autocomplete
            multiple
            options={tags}
            getOptionLabel={option => option.name}
            value={form.tags}
            onChange={(e, newValue) =>
              setForm(prevForm => ({
                ...prevForm,
                tags: newValue
              }))
            }
            renderInput={params => (
              <TextField {...params} label='Tags' margin='normal' />
            )}
          />
          <RadioGroup
            row
            value={form.isPublic.toString()}
            onChange={handlePublicChange}
            className='public-choice'
          >
            <FormControlLabel
              value='false'
              control={<Radio />}
              label='Private Dream'
            />
            <FormControlLabel
              value='true'
              control={<Radio />}
              label='Public Dream'
            />
          </RadioGroup>
          <InputField className='inputField mediumInput' label='Image Upload'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              disabled={waitingForImageUrl}
            />
            {waitingForImageUrl && <p>Uploading...</p>}
          </InputField>
          {form.imageUrl && (
            <div>
              <h4>Image Preview:</h4>
              <img
                src={form.imageUrl}
                alt='Uploaded'
                style={{ width: '100px', margin: '5px' }}
              />
            </div>
          )}
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          className='create-dream-button'
        >
          {waitingForImageUrl ? 'Uploading...' : '  Create New Dream'}
        </Button>
      </form>
    </div>
  )
}

export default CreateDream
