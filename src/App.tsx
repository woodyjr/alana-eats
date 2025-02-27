import { useState } from 'react'
import alanaEatsLogo from './assets/sb-burger.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="header">
        <h1>Alana Eats</h1>
      </header>
      <div className="profile-block">
        <img src={alanaEatsLogo} alt="Alana Eats Logo" className="profile-picture" />
        <div className="description">
          <p>Welcome to Alana Eats! I'm Alana, a registered dietitian with a passion for all things food. I earned my undergraduate degree from Miami University (Oxford) and completed my graduate studies at the University of Dayton, where I became a registered dietitian. Here, you'll find my latest culinary adventures, nutritious recipes, and honest food reviews. My goal is to inspire healthy and delicious eating, whether you're cooking at home or exploring new flavors. Follow me on Instagram for more updates and mouthwatering content!</p>
        </div>
      </div>
      <iframe src="//lightwidget.com/widgets/cd3ea4bb2dfa5a0da901d90efd05c1fe.html" allowTransparency={true} className="lightwidget-widget" style={{ width: '100%', border: 0, overflow: 'hidden' }}></iframe>

      <p>Check out my latest posts and follow me on IG for more updates!</p>
    </>
  )
}

export default App