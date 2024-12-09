import React, { useEffect, useState } from 'react'
import { fetchComments, deleteComment } from '../services/commentService'

const CommentList = ({ dreamId, newComment }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(dreamId)
        setComments(data)
      } catch (err) {
        console.error('Failed to fetch comments', err)
      } finally {
        setLoading(false)
      }
    }

    loadComments()
  }, [dreamId])

  // Update the list when a new comment is added
  useEffect(() => {
    if (newComment) {
      setComments(prev => [...prev, newComment])
    }
  }, [newComment])

  const handleDelete = async commentId => {
    try {
      await deleteComment(commentId)
      setComments(prev => prev.filter(comment => comment._id !== commentId))
    } catch (err) {
      console.error('Failed to delete comment', err)
    }
  }

  if (loading) {
    return <p>Loading comments...</p>
  }

  return (
    <>
      {comments.map(comment => (
        <div id='comment' key={comment._id}>
          <p>{comment.text}</p>
          <button
            onClick={() => handleDelete(comment._id)}
            className='comment-button'
          >
            Delete
          </button>
        </div>
      ))}
    </>
  )
}

export default CommentList
