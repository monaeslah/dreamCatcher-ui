import { useEffect, useState } from 'react'
import { useDreamContext } from '../../context/dreamContext'
import Card from '../../components/CardComponent'
import { Link } from 'react-router-dom'
import DreamButton from '../../components/common/button'
import nodream from '../../assets/images/nodreams.png'

const YourDreams = () => {
  const { myDreams, tags, emotions, fetchMyDreams } = useDreamContext()

  const [selectedTags, setSelectedTags] = useState([])
  const [selectedEmotions, setSelectedEmotions] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      await fetchMyDreams()
      setLoading(false)
    }
    fetchData()
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

  const toggleTag = tagId => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    )
  }

  const toggleEmotion = emotionId => {
    setSelectedEmotions(prev =>
      prev.includes(emotionId)
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    )
  }
  const applyFilters = () => {
    const filters = {}
    if (selectedTags.length > 0) filters.tags = selectedTags.join(',')
    if (selectedEmotions.length > 0)
      filters.emotions = selectedEmotions.join(',')
    fetchMyDreams(filters)
  }
  if (loading) {
    return <p>Loading dreams...</p>
  }

  return (
    <div>
      <h3>Your Dreams</h3>
      {myDreams.length === 0 ? (
        // <div>You have not any dream yet</div>
        <Card
          subtitle={"You don't have any dreams yet, start adding one!"}
          editMood={false}
          imageUrl={nodream}
        />
      ) : (
        <>
          <div className='subtitle1'>Filter by Tags:</div>
          <div className='tag-filter'>
            {tags.map(tag => (
              <DreamButton
                key={tag._id}
                label={tag.name}
                enable={true}
                size='small'
                className={` ${
                  selectedTags.includes(tag._id)
                    ? 'ok-green-btn'
                    : 'primary-btn'
                }`}
                onClick={() => toggleTag(tag._id)}
              />
            ))}
          </div>
          <br />
          <div className='subtitle1'>Filter by Emotions</div>
          <div className='emotion-filter '>
            {emotions.map(emotion => (
              <DreamButton
                key={emotion._id}
                label={emotion.name}
                enable={true}
                size='small'
                className={` ${
                  selectedEmotions.includes(emotion._id)
                    ? 'ok-green-btn'
                    : 'primary-btn'
                }`}
                onClick={() => toggleEmotion(emotion._id)}
              />
            ))}
          </div>
          <button onClick={applyFilters} className='filter caption'>
            Apply Filters
          </button>
        </>
      )}
      {myDreams.map(dream => {
        const emotionNames = getEmotionNames(dream.emotions || [])
        const tagNames = getTagNames(dream.tags || [])

        return (
          <div key={dream._id}>
            <Link to={`/dream/${dream._id}`}>
              <Card
                id={dream._id}
                title={dream.title}
                subtitle={dream.subtitle}
                description={dream.description}
                emotions={emotionNames}
                tags={tagNames}
                imageUrl={dream.imageUrl}
                editMood={false}
              />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default YourDreams
