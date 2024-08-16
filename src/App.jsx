import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
    <>
      <div className="App">
        <NavBar />
        <div className="Routes">
          <Routes>
            <Route path="/" element={<HomePage />}/>
          </Routes>
        </div>
        
        <Footer />
      </div>
    </>
  )
}

export default App
