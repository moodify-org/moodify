import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import Footer from './components/Footer/Footer'

import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <div className="App">
        <NavBar />

        <div className="Routes">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:moodId" element={<MoodPage />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </>
  )
}

export default App
