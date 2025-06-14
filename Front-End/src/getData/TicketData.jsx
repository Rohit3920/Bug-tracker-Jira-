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
        const response = await axios.get(`http://localhost:5000/update-ticket/${ticketId}`);
        console.log('Fetched ticket data by ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket data by ID:', error);
        throw new Error('Failed to load ticket. Please ensure your backend server is running.');
    }
}


export async function updateTicket(ticketId, updatedData) {
    try {
        const response = await axios.put(`http://localhost:5000/update-ticket/${ticketId}`, updatedData);
        console.log('Updated ticket data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating ticket data:', error);
        throw new Error('Failed to update ticket. Please ensure your backend server is running.');
    }
}

export const TicketDataByProjectId = async function (projectId) {
    try {
        const response = await axios.get(`http://localhost:5000/ticket/${projectId}`);
        console.log('Fetched ticket data by project ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket data by project ID:', error);
        throw new Error('Failed to load tickets. Please ensure your backend server is running.');
    }
}

export const UpdateTicketStatus = async function (ticketId, status) {
    try {
        //  `/api/tickets/${ticketId}/status`
        const response = await axios.put(`http://localhost:5000/ticket/${ticketId}/status`, { status });
        console.log('Updated ticket status:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating ticket status:', error);
        throw new Error('Failed to update ticket status. Please ensure your backend server is running.');
    }
}



