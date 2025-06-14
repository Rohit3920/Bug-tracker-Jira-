import axios from 'axios';

export async function ProjectData() {
    try {
        const response = await axios.get('http://localhost:5000/project');
        console.log('Fetched project data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching project data:', error);
        throw new Error('Failed to load projects. Please ensure your backend server is running.');
    }
}

export async function ProjectDataById(id) {
    console.log('Fetching project data by ID:', id);
    try {
        const response = await axios.get(`http://localhost:5000/project/${id}`);
        console.log('Fetched project data by ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching project data by ID:', error);
        throw new Error('Failed to load project. Please ensure your backend server is running.');
    }
}

export async function NewProject(projectData) {
            axios.post('http://localhost:5000/project/', projectData)
                .then((response) => {
                    console.log("Response : ", response.data);
                }).catch((error) => {
                    console.error("There was an error creating a project!", error);
                });
}

export async function ProjectUpdate(id, updatedProject) {
    try {
        const response = await axios.put(`http://localhost:5000/project/${id}`, updatedProject);
        console.log('Project updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw new Error('Failed to update project. Please ensure your backend server is running.');
    }
}