import axios from "axios";

export async function NewComment(commentData) {
    try {
        const response = await axios.post(`http://localhost:5000/ticket/comment`, commentData);
        console.log('Comment created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw new Error('Failed to create comment. Please ensure your backend server is running.');
    }
}
// /ticket/:id/history
export async function fetchTicketComments(ticketId) {
    try {
        const response = await fetch(`http://localhost:5000/ticket/comment-history/${ticketId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const comments = await response.json();
        console.log('Comments fetched successfully:', comments);
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        throw error; 
    }
}

// // Example usage:
// const myTicketId = '666d40f25e76a6e9a0f2b3e8'; // Replace with an actual ticket ID
// fetchTicketComments(myTicketId)
//     .then(comments => {
//         // Do something with the comments, e.g., update your React state
//         console.log('Displaying comments:', comments);
//     })
//     .catch(error => {
//         // Handle any errors that occurred during the fetch
//         console.error('Failed to get comments:', error);
//     });
