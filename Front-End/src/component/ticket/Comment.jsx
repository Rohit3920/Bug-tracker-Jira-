import React from 'react'
import { NewComment } from '../../getData/CommentData';
import { useParams } from 'react-router-dom';
import ShowComments from './ShowComments';

function Comment() {
    const { ticketId } = useParams();
    const [text, setText] = React.useState('');
    const user = localStorage.getItem('User');
    const userId = user ? JSON.parse(user)._id : null;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        console.log('Comment submitted:', { text, userId, ticketId });

        NewComment({ text, userId, ticketId })
            .then(() => {
                console.log('Comment submitted successfully');
                setText('');
            })
            .catch((error) => {
                console.error('Error submitting comment:', error);
            });

    }

    return (
        <div>
            <hr />
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                <input type="text" name="comment" onChange={(e) => setText(e.target.value)} value={text} placeholder="Add a comment..." className="border border-gray-300 rounded-md p-2 flex-1" />
                <button>comment</button>
                <div>
                </div>
            </form>
            <p className="mt-2 text-sm text-gray-700">
                This is a comment on the ticket. It can be a question, feedback, or any
                other relevant information.
            </p>
            <ShowComments />
        </div>
    )
}

export default Comment
