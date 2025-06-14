import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TicketDataById, updateTicket } from '../../getData/TicketData';
import { ProjectData } from '../../getData/ProjectData';
import { useNavigate } from 'react-router-dom';

const UpdateTicket = () => {
    const Navigate = useNavigate();
    const { ticketId } = useParams();
    console.log("ticket ID in UpdateTicket:", ticketId);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('medium');
    // const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState('Open');
    const [projectName, setProjectName] = useState('');
    // const [createdAt, setCreatedAt] = useState('');

    useEffect(() => {
        TicketDataById(ticketId)
            .then(data => {
                setTitle(data.title);
                setDesc(data.description);
                setPriority(data.priority);
                // setAssignee(data.assignee);
                setStatus(data.status);
                setProjectName(data.project);
                // setCreatedAt(data.createdAt);
            })
            .catch(error => {
                console.error("Error fetching ticket data:", error);
            });
    }, [ticketId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        updateTicket(ticketId, {
            title,
            description: desc,
            priority,
            status,
            project: projectName
        })
            .then(response => {
                console.log("Ticket updated successfully:", response);
                Navigate(`/`);
            })
            .catch(error => {
                console.error("Error fetching ticket data:", error);
            });
    };

    // if(!projects || projects.length === 0) {
    return (
        <div className="w-10/12 sm:w-1/2 mx-auto border-1 border-black rounded-2xl text-center p-8">
            <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Update Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="form-group">
                    <label className='flex text-sm/6 font-medium text-gray-900 pt-4' htmlFor="ticket-title">Title:</label>
                    <div className="mt-2">
                        <input className='block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 shadow-sm' type="text" id="ticket-title"
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className='flex text-sm/6 font-medium text-gray-900 pt-4' htmlFor="description">Description:</label>
                    <textarea className='block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 shadow-sm'
                        id="description"
                        name="description"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        rows="5"
                        required
                    ></textarea>
                </div>


                <div className="form-group w-full">
                    <label className='block float-left text-sm/6 font-medium text-gray-900 pt-4' htmlFor="priority">Priority:</label>
                    <select
                        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 shadow-sm"
                        id="priority"
                        name="priority"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}>
                        <option value="medium" disabled>Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group w-full">
                    <label className='block float-left text-sm/6 font-medium text-gray-900 pt-4' htmlFor="status">Status:</label>
                    <select
                        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 shadow-sm"
                        id="status"
                        name="status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>


                <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Ticket</button>
            </form>
        </div>
    )
};
export default UpdateTicket;