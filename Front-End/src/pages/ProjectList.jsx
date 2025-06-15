import React, { useEffect } from 'react'
import ProjectContent from '../component/project/ProjectContent'
import { ProjectData } from '../getData/ProjectData'

function ProjectList() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    useEffect(() => {
        ProjectData()
            .then((response) => {
                setData(response);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="flex-1 pt-10">
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