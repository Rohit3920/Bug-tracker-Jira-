import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Main from './pages/Main'
import ProjectList from './pages/ProjectList'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/project' element={<ProjectList/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
