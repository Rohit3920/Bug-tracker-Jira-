import axios from 'axios';

export async function TicketData() {
    try {
        const response = await axios.get(`http://localhost:5000/ticket`);
        console.log('Fetched ticket data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket data:', error);
        throw new Error('Failed to load tickets. Please ensure your backend server is running.');
    }
}

export async function TicketDataById(ticketId) {
    try {
        const response = await axios.get(`http://localhost:5000/ticket/${ticketId}`);
        console.log('Fetched ticket data by ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket data by ID:', error);
        throw new Error('Failed to load ticket. Please ensure your backend server is running.');
    }
}


export const TicketDataByProjectId = async function(projectId) {
    try {
        const response = await axios.get(`http://localhost:5000/ticket/${projectId}`);
        console.log('Fetched ticket data by project ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket data by project ID:', error);
        throw new Error('Failed to load tickets. Please ensure your backend server is running.');
    }
}
