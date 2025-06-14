import React from 'react'
import { TicketData } from '../../getData/TicketData'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function AllTickets() {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        TicketData()
        .then(data => {
            setTickets(data);
            setLoading(false);
        })
    .catch(err => {
            console.error('Error fetching tickets:', err);
            setError('Failed to load tickets. Please ensure your backend server is running.');
            setLoading(false);
        });
    }, []);

    return (
        <div className='container mx-auto p-4 mt-18'>
            <h1 className='text-2xl font-bold mb-4'>All Tickets</h1>
            {loading && <p>Loading tickets...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            {/* <th className="px-4 py-2 border-b">Project </th> */}
                            <th className="px-4 py-2 border-b">Title Name</th>
                            <th className="px-4 py-2 border-b">Status</th>
                            <th className="px-4 py-2 border-b">Created At</th>
                            <th className="px-4 py-2 border-b">Operation</th>

                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                {/* <td className="px-4 py-2 border-b">{ticket.projectId}</td> */}
                                <td className="px-4 py-2 border-b">{ticket.title}</td>
                                <td className="px-4 py-2 border-b">{ticket.status}</td>
                                <td className="px-4 py-2 border-b">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b">
                                    <button className="pr-2 text-blue-500 hover:underline"><Link to={`/ticket/${ticket._id}`}>View</Link></button>
                                    <button className="pr-2 text-red-500 hover:underline">Delete</button>
                                    <button className="pr-2 text-green-500 hover:underline"><Link to={`/ticket/update-ticket/${ticket._id}`}>Update</Link></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AllTickets
