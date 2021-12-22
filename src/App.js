import './App.css';
import { Router } from '@reach/router'
import Welcome from './pages/welcome';
import Game from './pages/game'

// Ask for clarification if routing should be used, or this should be a single page app with several states
function App() {
  return (
    <Router>
      <Welcome path="/" />
      <Game path="/game" />
    </Router>
  )
}

export default App;
