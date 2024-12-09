const moodColors = {
  happy: ['#FFF9C4', '#FFF176', '#FBC02D'],
  sad: ['#BBDEFB', '#64B5F6', '#1976D2'],
  angry: ['#FFCDD2', '#E57373', '#D32F2F'],
  anxious: ['#E1BEE7', '#BA68C8', '#7B1FA2'],
  excited: ['#FFE0B2', '#FFB74D', '#F57C00'],
  calm: ['#C8E6C9', '#81C784', '#388E3C'],
  neutral: ['#E0E0E0', '#BDBDBD', '#616161']
}

const MoodLegend = () => {
  return (
    <div
      style={{
        width: '250px',
        marginLeft: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}
    >
      <h3>Intensity & Mood Colors</h3>

      <h4>Intensity Levels</h4>

      <div>Low (1-3)</div>

      <div>Moderate (4-7)</div>

      <div>High (8-10)</div>
      {Object.entries(moodColors).map(([mood, colors]) => (
        <div key={mood} style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </div>
          <div style={{ display: 'flex' }}>
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  border: '1px solid #ccc',
                  marginRight: '0.5rem'
                }}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoodLegend
