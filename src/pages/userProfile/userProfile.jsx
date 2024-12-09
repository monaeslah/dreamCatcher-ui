import React, { useState, useEffect } from 'react'
import { useUserContext } from '../../context/userContext'
import {
  Card,
  Avatar,
  CircularProgress,
  Button,
  TextField,
  Snackbar,
  Alert
} from '@mui/material'

import { useDreamContext } from '../../context/dreamContext'
const Profile = () => {
  const { user, fetchUserProfile, updateUserProfile } = useUserContext()
  const { uploadImage } = useDreamContext()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    profileImageUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        username: user.username || '',
        profileImageUrl:
          user.profileImageUrl || 'https://via.placeholder.com/150'
      })
    }
  }, [user, isEditing])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingImage(true)
    setError('')
    try {
      const imageUrl = await uploadImage(file)
      setFormData(prev => ({ ...prev, profileImageUrl: imageUrl }))
      setSuccessMessage('Image uploaded successfully!')
    } catch (err) {
      setError('Error uploading image. Please try again.')
    } finally {
      setUploadingImage(false)
      setSnackbarOpen(true)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      await updateUserProfile(formData)
      setSuccessMessage('Profile updated successfully!')
      setSnackbarOpen(true)
      setIsEditing(false)
      fetchUserProfile()
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile')
      setSnackbarOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  if (!user) {
    return (
      <div className='profile-container'>
        <div className='profile-loading'>
          <CircularProgress />
        </div>
      </div>
    )
  }

  return (
    <div className='profile-container'>
      <Card className='profile-card'>
        <div className='profile-header'>
          <Avatar
            src={formData.profileImageUrl}
            className='profile-avatar'
            alt='Profile Avatar'
          />
          {isEditing ? (
            <>
              <TextField
                label='Username'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                margin='normal'
              />
              <div>
                <Button
                  variant='contained'
                  component='label'
                  disabled={uploadingImage}
                  style={{ marginTop: '15px' }}
                >
                  Upload Profile Picture
                  <input
                    type='file'
                    accept='image/*'
                    hidden
                    onChange={handleImageUpload}
                  />
                </Button>
                {uploadingImage && <p>Uploading image...</p>}
              </div>
              {formData.profileImageUrl && (
                <div>
                  <h4>Image Preview:</h4>
                  <img
                    src={formData.profileImageUrl}
                    alt='Uploaded'
                    style={{ width: '100px', margin: '10px 0' }}
                  />
                </div>
              )}
              {error && <div className='profile-error'>{error}</div>}
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleSave}
                disabled={loading || uploadingImage}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                fullWidth
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <div className='profile-username'>
                {user.username || 'Unnamed User'}
              </div>
              <div className='profile-email'>
                {user.email || 'No email provided'}
              </div>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                className='profile-button'
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={error ? 'error' : 'success'}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Profile
