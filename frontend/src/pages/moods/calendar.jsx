import React, { useState } from 'react'
import { useMoodContext } from '../../context/moodContext'
import { TextField } from '@mui/material'
const Calendar = ({ moods, setSelectedDate }) => {
  const { updateMoodData, deleteMoodData } = useMoodContext()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMood, setSelectedMood] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedMood, setEditedMood] = useState({
    mood: '',
    description: '',
    intensity: ''
  })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysOfWeek = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI']
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDay = new Date(year, month, i)

    const moodForDay = moods?.find(mood => {
      if (mood?.date) {
        return new Date(mood.date).toDateString() === currentDay.toDateString()
      }
      return false
    })

    const backgroundColor = moodForDay?.color || '#f0f0f0'

    calendarDays.push({
      day: i,
      mood: moodForDay,
      color: backgroundColor
    })
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1))
  }

  const handleDayClick = dayData => {
    if (!dayData || !dayData.day) return

    const mood = dayData.mood
    setSelectedMood(mood || null)
    setEditMode(false)

    setSelectedDate(new Date(year, month, dayData.day))
  }

  const handleDelete = async () => {
    if (selectedMood) {
      try {
        await deleteMoodData(selectedMood._id)
        setSelectedMood(null)
      } catch (err) {
        console.error('Error deleting mood:', err)
      }
    }
  }

  const handleEdit = () => {
    setEditMode(true)

    setEditedMood({ ...selectedMood })
  }

  const handleSave = async () => {
    try {
      await updateMoodData(selectedMood._id, editedMood)
      setSelectedMood({ ...selectedMood, ...editedMood })
      setEditMode(false)
    } catch (err) {
      console.error('Error updating mood:', err)
    }
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  return (
    <div className='calendar'>
      <div className='calendar-header'>
        <button onClick={handlePrevMonth}>Prev</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className='calendar-grid'>
        {daysOfWeek.map((day, index) => (
          <div key={index} className='day-header'>
            {day}
          </div>
        ))}

        {calendarDays.map((dayData, index) => (
          <div
            key={index}
            className={`day-cell ${dayData ? '' : 'empty'}`}
            style={{
              backgroundColor: dayData?.color,
              cursor: dayData?.day ? 'pointer' : 'default'
            }}
            onClick={() => handleDayClick(dayData)}
          >
            {dayData?.day || ''}
          </div>
        ))}
      </div>

      {selectedMood && (
        <div
          className='mood-details'
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        >
          <button
            onClick={() => setSelectedMood(null)}
            style={{ float: 'right', cursor: 'pointer' }}
          >
            Close
          </button>
          {editMode ? (
            <div className='edit-mood'>
              <h3>Edit Mood</h3>
              <div className='input-fields'>
                <TextField
                  name='mood'
                  select
                  value={editedMood.mood}
                  onChange={e =>
                    setEditedMood({ ...editedMood, mood: e.target.value })
                  }
                  margin='normal'
                  required
                  SelectProps={{
                    native: true
                  }}
                >
                  <option value=''>Select Mood</option>
                  <option value='happy'>Happy</option>
                  <option value='sad'>Sad</option>
                  <option value='angry'>Angry</option>
                  <option value='anxious'>Anxious</option>
                  <option value='excited'>Excited</option>
                  <option value='calm'>Calm</option>
                  <option value='neutral'>Neutral</option>
                </TextField>

                <TextField
                  name='Description'
                  type='text'
                  value={editedMood.description}
                  onChange={e =>
                    setEditedMood({
                      ...editedMood,
                      description: e.target.value
                    })
                  }
                  margin='normal'
                />
              </div>

              <br />

              <TextField
                name='  Intensity'
                type='number'
                value={editedMood.intensity}
                onChange={e =>
                  setEditedMood({ ...editedMood, intensity: e.target.value })
                }
                min='1'
                max='10'
                margin='normal'
              />

              <br />
              <div className='input-fields'>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <h3>Mood Details</h3>
              <p>{selectedMood.mood}</p>
              <p>
                <strong>Mood:</strong> {selectedMood.mood}
              </p>
              <p>
                <strong>Description:</strong> {selectedMood.description}
              </p>
              <p>
                <strong>Intensity:</strong> {selectedMood.intensity}
              </p>
              <div className='input-fields'>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Calendar
