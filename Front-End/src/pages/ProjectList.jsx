import axios from 'axios'
import React, { useEffect } from 'react'
import ProjectContent from '../component/ProjectContent'

function ProjectList() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    useEffect(() => {
        try {
            axios.get('http://localhost:5000/project')
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } catch (err) {
            setError(err.message);
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <section className="flex-1">
            <h1 className='text-2xl font-bold mb-4 text-center'>Projects</h1>
            <div className="flex-1">
                {
                    data.map((project, index) => (
                        <ProjectContent key={index} project={project} />
                    ))
                }
            </div>
        </section>
    )
}

export default ProjectList