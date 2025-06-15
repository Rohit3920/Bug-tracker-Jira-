import React from 'react';
import { Link } from 'react-router-dom';

function ProjectContent({ project }) {
    if (!project) {
        return <div className="text-center text-gray-500 p-4">No project data available.</div>;
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'planning':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'on hold':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Link to={`/project/${project._id}`} key={project.id} className="">
            <div className=" bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 ease-in-out w-full">

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {project.title || 'Untitled Project'}
                </h2>

                <p className="text-gray-700 text-sm mb-4">
                    {project.description || 'No description provided.'}
                </p>

                <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-600 mr-2">Status:</span>
                    <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${getStatusColor(project.status || 'default')}
                `}>
                        {project.status || 'N/A'}
                    </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                    <span className="font-semibold text-gray-600 mr-2">Created On:</span>
                    <span>
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                </div>

            </div>
        </Link >
    );
}

export default ProjectContent;