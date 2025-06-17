import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus, faRedo, faProjectDiagram, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import ProjectContent from '../component/project/ProjectContent';
import { ProjectData, deleteProject } from '../getData/ProjectData';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await ProjectData();
            setProjects(response || []);
            toast.success('Projects loaded successfully!');
        } catch (err) {
            console.error('Error fetching project data:', err);
            setError(err.message || 'Failed to load projects.');
            toast.error(err.message || 'Failed to load projects!');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleDeleteProject = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
                await deleteProject(projectId);
                toast.success('Project deleted successfully!');
                fetchProjects();
            } catch (err) {
                console.error('Error deleting project:', err);
                toast.error(err.message || 'Failed to delete project.');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-blue-600 mb-4" />
                <p className="text-lg text-gray-700">Loading projects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
                <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="text-red-500 mb-4" />
                    <p className="text-xl font-semibold text-red-700 mb-4">Error Loading Projects</p>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <button
                        onClick={fetchProjects}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center mx-auto"
                    >
                        <FontAwesomeIcon icon={faRedo} className="mr-2" /> Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="flex-1 p-8 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className='text-4xl font-extrabold text-gray-900 flex items-center'>
                        <FontAwesomeIcon icon={faProjectDiagram} className="mr-3 text-blue-600" />
                        My Projects
                    </h1>
                    <div className="flex space-x-4">
                        <Link to="/project/create-Project" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition duration-200 flex items-center">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            New Project
                        </Link>
                        <button
                            onClick={fetchProjects}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-200 flex items-center"
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faRedo} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-lg shadow-md mt-10">
                        <p className="text-xl text-gray-600 mb-6">
                            No projects found. It looks like your project list is empty!
                        </p>
                        <Link to="/project/create-Project" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create Your First Project
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectContent
                                key={project._id}
                                project={project}
                                onDelete={handleDeleteProject}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProjectList;