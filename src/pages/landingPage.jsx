import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  const handleRedirect = () => {
    navigate('/signup')
  }

  return (
    <div id='landing-container'>
      <header className='landing-header'>
        <div className='hero'>
          <h1>Explore the World of Your Dreams</h1>
          <p>
            A personal space to log, analyze, and unlock the mysteries of your
            subconscious mind.
          </p>
          <button className='cta-button' onClick={handleRedirect}>
            Start Your Journey
          </button>
        </div>
      </header>

      <section className='features'>
        <h2>Why Use DreamCatcher?</h2>
        <div className='feature-cards'>
          <div className='card'>
            <h3>📓 Dream Logging</h3>
            <p>Easily record your dreams with tags and emotions.</p>
          </div>
          <div className='card'>
            <h3>📊 Analytics</h3>
            <p>Visualize patterns and gain deeper insights.</p>
          </div>
          <div className='card'>
            <h3>🌟 Community</h3>
            <p>Connect with dreamers worldwide and share experiences.</p>
          </div>
        </div>
      </section>

      <section className='cta-section'>
        <h5>Ready to Uncover Your Dreams?</h5>
        <button className='cta-button' onClick={handleRedirect}>
          Get Started Now
        </button>
      </section>

      <footer className='landing-footer'>
        <p>&copy; 2024 DreamCatcher App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
