import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Main from './pages/Main'
import ProjectList from './pages/ProjectList'
import TicketList from './pages/TicketList'
import ProtectRoute from './ProtectRoute'
import TicketDetailPage from './pages/TicketDetailPage'
import Navbar from './component/Navbar'
import TicketForm from './component/TicketForm'
import ProjectDetail from './component/ProjectDetail'
import ProjectSelector from './component/ProjectSelector'

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="mb-10"></div>
        <Routes>
          <Route element={<ProtectRoute />}>
            <Route path='/' element={<Main />} />
            <Route path='/project' element={<ProjectList />} />
            <Route path='/project/:projectId' element={<ProjectDetail />} />
            <Route path='/project/selected' element={<ProjectSelector />} />
            <Route path='/ticket/:projectId' element={<TicketList />} />
            <Route path='/ticket/addTicket' element={<TicketForm />} />

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
