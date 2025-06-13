import React, { useState, useEffect } from "react";
import TicketUI from "../component/TicketUI";
import { TicketDataByProjectId } from "../getData/TicketData";
import { useParams } from "react-router-dom";

function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { projectId } = useParams();

    async function getTicketData(currentProjectId) {
        setLoading(true);
        setError(null);

        try {
            await TicketDataByProjectId(currentProjectId).then(response => {
                console.log('TicketDataByProjectId response:', response);
                setTickets(response);
            }).catch(err => {
                console.error('Error in TicketDataByProjectId:', err);
                setError('Failed to load tickets. Please ensure your backend server is running.');
            });
        } catch (err) {
            console.error('Error fetching tickets:', err);
            let errorMessage = 'Failed to load tickets.';
            if (err.response) {
                errorMessage = `Error ${err.response.status}: ${err.response.data.error || err.response.data.message || 'Server error'}`;
            } else if (err.request) {
                errorMessage = 'Network error: No response from server.';
            } else {
                errorMessage = `Request setup error: ${err.message}`;
            }
            setError(errorMessage);
            setTickets([]);
        } finally {
            setLoading(false);
            setTickets()
        }
    }

    useEffect(() => {
        getTicketData(projectId);
    }, [projectId]);

    console.log('Current state of tickets (for rendering):', tickets);


    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Tickets</h2>
                    <p className="mt-2 text-lg/8 text-gray-600">Project Bugs, Issues and Feature requirement.</p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 relative">
                    {loading ? (
                        <p className="text-center text-gray-600 col-span-full">Loading tickets...</p>
                    ) : error ? (
                        <p className="text-center text-red-600 col-span-full">Error: {error}</p>
                    ) : tickets ? (
                        tickets.map((data) => (
                            <TicketUI data={data} key={data._id} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No tickets found for this project.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TicketList;