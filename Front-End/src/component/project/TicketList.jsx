import React, { useState, useEffect, useCallback } from "react";
import { TicketDataByProjectId } from '../../getData/TicketData';
import { useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamationTriangle, faTicketAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { projectId } = useParams();
    const getTicketData = useCallback(async (currentProjectId) => {
        setLoading(true);
        setError(null);
        setTickets([]);

        try {
            if (!currentProjectId) {
                setError('No project ID provided in the URL to fetch tickets.');
                setLoading(false);
                return;
            }

            const response = await TicketDataByProjectId(currentProjectId);
            console.log('TicketDataByProjectId response:', response);

            if (Array.isArray(response)) {
                setTickets(response);
                toast.success('Tickets loaded successfully!');
            } else {
                console.error('API response is not an array:', response);
                setError('Received unexpected data format from the ticket API.');
                setTickets([]);
            }
        } catch (err) {
            console.error('Error fetching tickets:', err);
            let errorMessage = 'Failed to load tickets. Please ensure your backend server is running and the API endpoint is correct.';

            if (err.response) {
                errorMessage = `Error ${err.response.status}: ${err.response.data.error || err.response.data.message || 'Server error'}`;
            } else if (err.request) {
                errorMessage = 'Network error: No response from server. Please check your internet connection or backend server status.';
            } else {
                errorMessage = `Request setup error: ${err.message}`;
            }
            setError(errorMessage);
            setTickets([]);
            toast.error(errorMessage);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (projectId) {
            getTicketData(projectId);
        } else {
            setLoading(false);
            setError('Please select a project to view tickets.');
        }
    }, [projectId, getTicketData]);

    console.log('Current state of tickets (for rendering):', tickets);

    return (
        <div className="bg-white py-12 sm:py-16 min-h-screen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl flex items-center">
                        <FontAwesomeIcon icon={faTicketAlt} className="mr-4 text-blue-600" />
                        Tickets
                    </h2>
                    <br />
                    <Link to={`/ticket/addTicket/`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md">
                        Create New Ticket
                    </Link>
                    <p className="mt-2 text-lg text-gray-600">Project bugs, issues, and feature requirements.</p>
                </div>

                <div className="mx-auto mt-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none relative">
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-10">
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-blue-600 mb-4" />
                            <p className="text-lg text-gray-700">Loading tickets...</p>
                        </div>
                    ) : error ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                            <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="text-red-500 mb-4" />
                            <p className="text-xl font-semibold text-red-700 mb-4">Error Loading Tickets!</p>
                            <p className="text-gray-700 mb-6">{error}</p>
                            <button
                                onClick={() => getTicketData(projectId)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center mx-auto"
                            >
                                <FontAwesomeIcon icon={faSpinner} spin={loading} className="mr-2" /> Retry
                            </button>
                        </div>
                    ) : tickets.length > 0 ? (
                        <ul className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            {tickets.map((ticket) => (
                                <li key={ticket._id}>
                                    <Link to={`/ticket/ticket-view/${ticket._id}`} >
                                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{ticket.title}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">{ticket.description}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-10 text-center bg-gray-50 p-8 rounded-lg shadow-inner">
                            <p className="text-xl text-gray-600 mb-6">
                                No tickets found for this project.
                            </p>
                            <Link to="/ticket/create-ticket" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create New Ticket
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TicketList;
