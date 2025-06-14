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
import UpdateTicket from './component/ticket/UpdateTicket'
import CreateProject from './component/project/createProject'
import UpdateProject from './component/project/UpdateProject'
import AllTickets from './component/ticket/AllTickets'
// import Sidebar from './component/DashboardCompo/sidebar'

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* <div className="fixed h-screen md:w-50 bg-gray-800 shadow-md border-r border-gray-200">
          <Sidebar />
        </div> */}
        <div className="mb-10"></div>
        <Routes>
          <Route element={<ProtectRoute />}>
            <Route path='/' element={<Main />} />
            <Route path='/project' element={<ProjectList />} />
            <Route path='/project/create-Project' element={<CreateProject />} />
            <Route path='/project/update-Project/:projectId' element={<UpdateProject />} />
            <Route path='/project/:projectId' element={<ProjectDetail />} />
            <Route path='/project/selected' element={<ProjectSelector />} />

            <Route path='/ticket' element={<AllTickets />} />
            <Route path='/ticket/project-ticket/:projectId' element={<TicketList />} />
            <Route path='/ticket/update-ticket/:ticketId' element={<UpdateTicket />} />
            <Route path='/ticket/addTicket' element={<TicketForm />} />

            <Route path='/ticket/ticketDetail/' element={<TicketDetailPage />} />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
