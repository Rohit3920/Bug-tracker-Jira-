import React, { useState } from 'react'
import { NewProject } from '../../getData/ProjectData';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Not Started');
    // const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError('Title and description are required');
            return error;
        }

        const projectData = {
            title,
            description,
            status,
            createdAt : new Date().toISOString(),
        };

        NewProject(projectData)
            .then(() => {
                console.log('Project Created:', projectData);
                navigate('/project');
            })
            .catch((error) => {
                console.error('Error creating project:', error);
                setError('Failed to create project');
            });
    };

    return (
    <div className='container mx-auto mt-18 '>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Create New Project
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-semibold text-gray-500">Title:</label>
                <input
                    type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-500">Description:</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter project description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-500">Status:</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Create Project
                </button>
            </form>
        </div>
    )
}

export default CreateProject
