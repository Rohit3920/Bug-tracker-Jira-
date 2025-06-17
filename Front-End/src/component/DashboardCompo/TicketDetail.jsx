import React from 'react';
import { useNavigate } from 'react-router-dom';

function TicketDetail({ ticket }) {

    const Navigate = useNavigate();

    if (!ticket) {
        return <div className="text-center text-gray-500 p-4">No ticket data available.</div>;
    }

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'to do':
                return 'bg-gray-200 text-gray-800';
            case 'in progress':
                return 'bg-blue-100 text-blue-800';
            case 'done':
                return 'bg-emerald-100 text-emerald-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className=" size-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-200 w-full mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{ticket.title}</h3>

            <p className="text-gray-700 text-sm mb-4">{ticket.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-20">Priority:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                    </span>
                </div>

                <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-20">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                    </span>
                </div>

                <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-20">Created:</span>
                    <span className="text-gray-700">
                        {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                </div>

                <div className="flex items-start col-span-full sm:col-span-1">
                    <span className="font-semibold text-gray-600 w-20">Assignee(s):</span>
                    <div className="flex flex-wrap gap-1">
                        {ticket.assignees && ticket.assignees.length > 0 ? (
                            ticket.assignees.map((assignee, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {assignee}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 italic">Unassigned</span>
                        )}
                    </div>
                </div>

                <div className="w-full px-auto">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md"
                        onClick={() => Navigate(`/ticket/update-ticket/${ticket._id}`)}
                        >Update Ticket</button>
                </div>

            </div>
        </div>
    );
}

export default TicketDetail;