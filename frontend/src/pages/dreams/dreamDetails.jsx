import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AddnewComment from '../../components/createComment'
import CommentList from '../../components/commentList'
import { useDreamContext } from '../../context/dreamContext'
import Card from '../../components/CardComponent'
import { TextField } from '@mui/material'
const DreamDetails = ({ editMood }) => {
  const { dreamId } = useParams()
  const {
    updateDream,
    deleteDream,
    tags,
    emotions,
    fetchDreamById,
    specificDream,
    error
  } = useDreamContext()

  const [newComments, setNewComments] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editedDream, setEditedDream] = useState({})
  const handleNewComment = (dreamId, newComment) => {
    setNewComments(prev => ({
      ...prev,
      [dreamId]: newComment
    }))
  }

  useEffect(() => {
    if (dreamId) {
      fetchDreamById(dreamId)
    }
  }, [])
  const getEmotionNames = emotionIds => {
    return emotionIds.map(id => {
      const emotion = emotions.find(emotion => emotion._id === id)
      return emotion ? emotion.name : 'Unknown Emotion'
    })
  }

  const getTagNames = tagIds => {
    return tagIds.map(id => {
      const tag = tags.find(tag => tag._id === id)
      return tag ? tag.name : 'Unknown Tag'
    })
  }
  console.log('????', editMood)
  const handleDelete = async dreamId => {
    await deleteDream(dreamId)
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    setEditedDream(prev => ({ ...prev, [name]: value }))
  }
  const handleSaveClick = async () => {
    await updateDream(editingId, editedDream)
    setEditingId(null)
  }
  if (error) return <p>{error}</p>
  if (!specificDream) return <p>Loading...</p>

  const emotionNames = getEmotionNames(specificDream.emotions || [])
  const tagNames = getTagNames(specificDream.tags || [])
  return (
    <div>
      {specificDream ? (
        <>
          {editingId === specificDream._id ? (
            <div>
              <TextField
                label='Title'
                name='title'
                value={editedDream.title}
                onChange={handleInputChange}
                fullWidth
                margin='normal'
              />
              <textarea
                name='description'
                value={editedDream.description}
                onChange={handleInputChange}
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <Card
              id={specificDream._id}
              title={specificDream.title}
              subtitle={specificDream.subtitle}
              description={specificDream.description}
              emotions={emotionNames}
              tags={tagNames}
              imageUrl={specificDream.imageUrl}
              onEditItem={(id, updatedData) => updateDream(id, updatedData)}
              onDeleteItem={() => handleDelete(specificDream._id)}
              editMood={true}
            />
          )}
          <CommentList
            dreamId={specificDream._id}
            newComment={newComments[specificDream._id]}
          />
          <AddnewComment
            dreamId={specificDream._id}
            onCommentAdded={newComment =>
              handleNewComment(specificDream._id, newComment)
            }
          />
        </>
      ) : (
        <p>Loading dream details...</p>
      )}
    </div>
  )
}

export default DreamDetails
