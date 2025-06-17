import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TicketData, deleteTicket } from '../../getData/TicketData';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

function AllTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await TicketData();
            setTickets(data);
        } catch (err) {
            console.error('Error fetching tickets in component:', err);
            setError(err.message || 'Failed to load tickets. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            setDeletingId(id);
            try {
                await deleteTicket(id);
                setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== id));
                toast.done('Ticket deleted successfully!');
            } catch (err) {
                console.error('Error deleting ticket:', err);
                toast.error(err.message || 'Failed to delete ticket. Please try again.');
            } finally {
                setDeletingId(null);
            }
        }
    };

    if (loading) {
        return (
            <div className='container mx-auto p-4 mt-18 text-center'>
                <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-blue-500" />
                <p className="mt-2">Loading tickets...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='container mx-auto p-4 mt-18'>
                <p className="text-red-600 font-bold text-lg">Error: {error}</p>
                <button
                    onClick={fetchTickets}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry Loading Tickets
                </button>
            </div>
        );
    }

    if (tickets.length === 0) {
        return (
            <div className='container mx-auto p-4 mt-18 text-center'>
                <p className="text-gray-600 text-lg">No tickets found.</p>
                <Link to="/ticket/addTicket" className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Create New Ticket
                </Link>
            </div>
        );
    }

    return (
        <div className='container mx-auto p-4 mt-18'>
            <h1 className='text-3xl font-extrabold mb-6 text-gray-800'>All Tickets</h1>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Operations
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket._id} className="hover:bg-gray-50">
                                <td className="px-5 py-3 border-b border-gray-200 text-sm">
                                    {ticket.title}
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                                            ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                ticket.status === 'Closed' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 text-sm">
                                    {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
                                    <Link to={`/ticket/ticket-view/${ticket._id}`} className="text-blue-600 hover:text-blue-800 mr-3">
                                        <FontAwesomeIcon icon={faEye} title="View Ticket" />
                                    </Link>
                                    <Link to={`/ticket/update-ticket/${ticket._id}`} className="text-green-600 hover:text-green-800 mr-3">
                                        <FontAwesomeIcon icon={faEdit} title="Edit Ticket" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(ticket._id)}
                                        className="text-red-600 hover:text-red-800"
                                        disabled={deletingId === ticket._id}
                                        title="Delete Ticket"
                                    >
                                        {deletingId === ticket._id ? (
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                        ) : (
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllTickets;