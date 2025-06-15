import React, { useEffect, useState } from 'react'
import { TicketDataById } from '../../getData/TicketData'
import { ProjectDataById } from '../../getData/ProjectData'
import { useParams } from 'react-router-dom';
import Comment from './Comment';

function TicketView() {
    const [ticket, setTicket] = useState(null);
    const [project, setProject] = useState(null);
    const { ticketId } = useParams();

    useEffect(() => {
        async function getTicket(){
            TicketDataById(ticketId)
            .then(data => {
                setTicket(data);
                console.log('Ticket data:', data);
            })
            .catch(error => {
                console.error('Error fetching ticket data:', error);
            });
        }
        getTicket()
        console.log(ticket);

    }, [ticketId])

    useEffect(() => {
        if (ticket) {
            ProjectDataById(ticket.projectId)
                .then(data => {
                    setProject(data.title);
                    console.log('Project data:', data);
                })
                .catch(error => {
                    console.error('Error fetching project data:', error);
                });
        }
    }, [ticket])

    return (
        <div>
            {ticket ? (
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{ticket.title}</h2>
                    <h3 className='text-gray-600 mb-2'>Project Name : {
                        ticket.projectId ? project : 'No Project Assigned'
                    }</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{ticket.description}</p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Status:</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${ticket.status === 'Open' ? 'bg-green-100 text-green-800' : ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            {ticket.status}
                        </span>
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(ticket.createdAt).toLocaleString()}
                    </p>

                    <Comment />

                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg py-8">Loading ticket...</p>
            )}
        </div>
    )
}

export default TicketView
