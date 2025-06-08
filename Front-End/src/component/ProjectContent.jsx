import React from 'react'

function ProjectContent({ project }) {
    return (
        <div className="p-4 border-b border-gray-200 border-2 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-gray-500">Status: {project.status}</p>
            <p className="text-gray-500">Created On: {new Date(project.createdAt).toLocaleDateString()}</p>
        </div>
    )
}

export default ProjectContent