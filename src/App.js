import React from 'react'
import ColorCard from './ColorCard'
import Tip from './Tip'
import './App.css'

const BG_COLOR = '#fff'
const TOTAL = 24
const FFFFFF = 16777215
const NUMBER_16 = [
  '0', '1', '2', '3', '4',
  '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f'
]
const generateColors = () => (new Array(TOTAL).fill('')).map(() => {
  let color = Math.floor(Math.random() * (FFFFFF + 1)).toString(16)
  while (color.length < 6) {
    color += NUMBER_16[Math.floor(Math.random() * NUMBER_16.length)]
  }
  return `#${color}`
})

function App() {
  const tipRef = React.useRef()
  const [currentColor, setCurrentColor] = React.useState(BG_COLOR)

  const [colors, setColors] = React.useState(generateColors())
  const handleClickColor = (e) => {
    let color = e.target.dataset.color
    if (!color) return
    setCurrentColor(color)
    if (navigator.clipboard) {
      navigator.clipboard.writeText(color)
      tipRef.current.show()
    }
  }

  return (
    <div className="App" style={{ backgroundColor: currentColor }}>
      <header className="App-header">
        Color Factory
      </header>
      <div className="main">
        <div className="color-palette" onClick={handleClickColor}>{colors.map(color => <ColorCard key={color} color={color} />)}</div>
        <div className="main-footer">
          <button className="generate-color-btn" onClick={() => {
            setColors(generateColors())
          }}>Generate Color Palette</button>
        </div>
      </div>
      <Tip ref={tipRef} color={currentColor} />
    </div>
  );
}

export default App;
