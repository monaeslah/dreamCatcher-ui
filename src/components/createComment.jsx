import { useState } from 'react'
import { addComment } from '../services/commentService'
import InputField from './common/inputField'
import DreamButton from './common/button'
const AddnewComment = ({ dreamId, onCommentAdded }) => {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newComment = await addComment(dreamId, text)
      onCommentAdded(newComment) // Pass the new comment back to the parent
      setText('')
    } catch (err) {
      setError('Failed to add comment')
      console.error('Error adding comment:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        className='inputField comment-area'
        // label='Email'
      >
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Write your comment...'
          required
        />
      </InputField>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DreamButton
        label='Add Comment'
        enable={true}
        size='medium'
        className={'primary-btn comment-position'}
        onClick={handleSubmit}
      />
    </form>
  )
}

export default AddnewComment
