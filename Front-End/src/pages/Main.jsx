import React from 'react'
import { Link } from 'react-router-dom'
import TicketContent from '../component/TicketContent.jsx'

function Main() {

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Hello, Its Bug Tracker(Jira) Application</h1>
            <br />
            <Link to="/project" className="text-blue-500 hover:underline">Projects</Link>
            <br />
            <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            <TicketContent />
            <br />
        </div>
    )
}

export default Main