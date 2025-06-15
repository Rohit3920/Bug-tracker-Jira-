import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ProjectSelector from '../project/ProjectSelector';
import { ProjectData } from '../../getData/ProjectData';

const TicketForm = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState("medium");
    const [assignee, setAssign] = useState(["6843cb5390b184e9813d8c2c"]);
    // const [status, setStatus] = useState("open");
    const [project, setProject] = useState("");

    // used for select project
    const [projects, setProjects] = useState([]);

    const formData = {
        title: title,
        description: desc,
        priority: priority,
        assignee,
        status: "Open",
        project: project,
        createdAt: new Date(),
    };

    useEffect(() => {
        ProjectData()
            .then((response) => {
                setProjects(response);
            }).catch((err) => {
                console.error('Error fetching projects:', err);
            });
    }, []);

    const handleChange = (event) => {
        const newProjectId = event.target.value;
        setProject(newProjectId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.assignee) {
            alert('Please fill in all required fields (Title, Description, Assignee).');
            return;
        }

        const headers = {
            'authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        const data = {
            title,
            description: desc,
            priority,
            status: "open",
            assignee,
            projectId: project
        }

        axios.post('http://localhost:5000/ticket/', { data, headers })
            .then((response) => {
                console.log("Response : ", response.data);
            }).catch((error) => {
                console.error("There was an error creating a ticket!", error);
            });

        console.log(formData)
    };

    return (
        <div className="w-10/12 sm:w-1/2 mx-auto border-1 border-black rounded-2xl text-center p-8">
            <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="form-group">
                    <label className='flex text-sm/6 font-medium text-gray-900 pt-4' htmlFor="ticket-title">Title:</label>
                    <div className="mt-2">
                        <input className='block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 shadow-sm' type="text" id="ticket-title"
                            name="title"
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
                        onChange={e => setDesc(e.target.value)}
                        rows="5"
                        required
                    ></textarea>
                </div>

                {/* <div className="form-group">
                    <label htmlFor="assignees" className="block text-sm font-medium text-gray-700 mb-1">
                        Assignees (Select multiple by holding Ctrl/Cmd)
                    </label>
                    <select
                        id="assignees"
                        multiple
                        value={assign}
                        onChange={handleAssigneeChange}
                        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 shadow-sm">
                        <option value="" disabled>Select assignees</option>
                        {teamMembers.map((member) => (
                            <option key={member.id} value={member.name}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                </div> */}

                <div className="form-group w-full">
                    <label className='block float-left text-sm/6 font-medium text-gray-900 pt-4' htmlFor="priority">Priority:</label>
                    <select
                        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 shadow-sm"
                        id="priority"
                        name="priority"
                        defaultValue="medium"
                        onChange={e => setPriority(e.target.value)}>
                        <option value="medium" disabled>Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className='flex text-sm/6 font-medium text-gray-900 pt-4' htmlFor="project">Project/Module:</label>
                    <div
                        className="block w-full p-3 borderrounded-lg  bg-white text-gray-800 appearance-none cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-400 shadow-sm"
                        id="project"
                        name="project"
                        onChange={e => setProject(e.target.value)}
                    >

                        <select
                            id="project-select"
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={project}
                            onChange={handleChange}
                        >
                            <option value="">-- Choose a project --</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project._id}>
                                    {project.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Ticket</button>
            </form>
        </div>
    );
};

export default TicketForm;