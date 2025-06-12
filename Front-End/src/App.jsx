import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Main from './pages/Main'
import ProjectList from './pages/ProjectList'
import TicketList from './pages/TicketList'
import ProtectRoute from './ProtectRoute'
import TicketDetailPage from './pages/TicketDetailPage'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<ProtectRoute />}>
            <Route path='/' element={<Main />} />
            <Route path='/project' element={<ProjectList />} />
            <Route path='/ticket/:projectId' element={<TicketList />} />
            <Route path='/ticket/ticketDetail/' element = {<TicketDetailPage />} />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
