import React, { useState, useEffect } from 'react';
import { ProjectDataById } from '../getData/ProjectData';
import { UserDataById } from '../getData/UserData';
import { Link, useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        ProjectDataById(projectId)
            .then((response) => {
                setProject(response);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [projectId]);



    if (loading) {
        return <div className="text-gray-600">Loading projects...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                    Project Details
                </h1>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Title:</p>
                        <p className="text-2xl font-bold text-blue-700">{project.title}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Description:</p>
                        <p className="text-gray-800 text-lg leading-relaxed">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-auto">
                            <p className="text-sm font-semibold text-gray-500">Status:</p>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'Not Started'
                                    ? 'bg-red-100 text-red-800'
                                    : project.status === 'In Progress'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}
                            >
                                {project.status}
                            </span>
                        </div>

                        <div className="w-full sm:w-auto">
                            <p className="text-sm font-semibold text-gray-500">Created At:</p>
                            <p className="text-gray-700">{project.createdAt.toLocaleString()}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Team Members (IDs):</p>
                        {project.teamMembers.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 mt-1">
                                {project.teamMembers.map((memberId, index) => (
                                    <li key={index}>{
                                        memberId
                                    }</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 italic">No team members assigned.</p>
                        )}
                    </div>


                    <div className="text-xs  pt-4 mt-4">
                        <p className='text-gray-400 border-t mb-5'><strong>Project ID:</strong> {project._id}</p>
                        <Link className='mr-3' to={`/ticket/project-ticket/${project._id}`}><button className='bg-orange-500 text-white px-4 py-2 rounded-md'>Show tickets</button></Link>
                        <Link className='mr-3' to={`/project/update-Project/${project._id}`}><button className='bg-red-500 text-white px-4 py-2 rounded-md'>Edit Project</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;