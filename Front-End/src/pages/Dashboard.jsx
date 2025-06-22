import React, { useEffect } from 'react';
import { ProjectData } from '../getData/ProjectData';
import { TicketData } from '../getData/TicketData';
import DashboardTicket from '../component/DashboardCompo/DashboardTicket';
import DashboardProjects from '../component/DashboardCompo/DashboardProjects';
import Sidebar from '../component/DashboardCompo/Sidebar';
import { Link } from 'react-router-dom';
import ProjectSelector from '../component/project/ProjectSelector';
import Breadcrumbs from '../component/Breadcrumbs';

function Dashboard() {

  const [projects, setProjects] = React.useState([])
  const [tickets, setTieckts] = React.useState([])

  const myData = JSON.parse(localStorage.getItem('User'))

  useEffect(() => {
    ProjectData()
      .then((response) => {
        setProjects(response);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
      });
  }, []);

  useEffect(() => {
    TicketData()
      .then((response) => {
        setTieckts(response);
      })
      .catch((err) => {
        console.error('Error fetching tickets:', err);
      });
  }, []);


  console.log('Projects data:', projects);
  console.log('Tickets data:', tickets);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">

      <div className="fixed h-screen md:w-50 bg-gray-800 shadow-md border-r border-gray-200">
        <Sidebar />
      </div>
      <main className="flex-1 ml-2 md:ml-50 p-8 pb-16 md:p-8 overflow-y-auto">
        <Breadcrumbs parentName="Dashboard" parentRoute="/" currentName="Overview" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Dashboard Overview</h1>
        <DashboardTicket ticket={tickets} myData={myData} />

        <DashboardProjects projects={projects} />

        <section className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">More Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/project/create-Project" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md">
              Create New Project
            </Link>
            <Link to="/ticket/addTicket" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md">
              Create New Ticket
            </Link>
            <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md">
              <ProjectSelector />
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;
