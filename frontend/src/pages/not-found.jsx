import { useNavigate } from 'react-router-dom'
import DreamButton from '../components/common/button'

function NotFound () {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      color: '#333',
      margin: 'auto',
      width: '100%'
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '1rem'
    },
    paragraph: {
      fontSize: '1rem',
      color: '#555'
    },
    p: {
      marginButton: '20px'
    }
  }
  const navigate = useNavigate()
  const handleRedirect = () => {
    navigate('/mine-dreams')
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>
        Sorry, the page you're looking for doesn't exist.
      </p>

      <DreamButton
        label={'Back to your Dreams'}
        enable={true}
        size='medium'
        className={'primary-btn margin-top'}
        onClick={handleRedirect}
      />
    </div>
  )
}

export default NotFound
