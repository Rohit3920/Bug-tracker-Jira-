import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectDataById, ProjectUpdate } from '../../getData/ProjectData';
import { useNavigate } from 'react-router-dom';

function UpdateProject() {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Not Started');

    useEffect(() => {
        ProjectDataById(projectId)
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
            })
            .catch((error) => {
                console.error("Error fetching project data:", error);
            });
    }, [projectId]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProject = { title, description, status };
        ProjectUpdate(projectId, updatedProject)
            .then(() => {
                console.log("Project updated successfully:", updatedProject);
                navigate(`/project/${projectId}`);
            })
            .catch((error) => {
                console.error("Error updating project:", error);
            });
    };

    return (
    <div className='container mx-auto mt-18 '>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Update Project
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
                    Update Project
                </button>
            </form>
        </div>
    )
}

export default UpdateProject
