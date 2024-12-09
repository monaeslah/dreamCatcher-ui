const moodColors = {
  happy: ['#E6D1FF', '#D1A6FF', '#B473FF'],
  sad: ['#A7C9FF', '#82A9FF', '#4D8AC5'],
  angry: ['#FFDDC1', '#FFABAB', '#FF6F6F'],
  anxious: ['#FFF9C4', '#FFE082', '#FFB300'],
  excited: ['#FFDBA3', '#FF9E58', '#FF6F00'],
  calm: ['#C5E1A5', '#A5D6A7', '#66BB6A'],
  neutral: ['#DCDCDC', '#BDBDBD', '#8C8C8C']
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
