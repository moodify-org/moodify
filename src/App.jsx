import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MoodPage from './pages/MoodPage/MoodPage'
import Footer from './components/Footer/Footer'

import { Route, Routes } from 'react-router-dom'
import './App.css'
import AboutPage from './pages/About/AboutPage'

function App() {

  return (
    <>
      <div className="App">
        <NavBar />

        <div className="Routes">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:moodId" element={<MoodPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
