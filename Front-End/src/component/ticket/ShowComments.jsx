import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchTicketComments } from '../../getData/CommentData';

function ShowComments() {
    const { ticketId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        console.log(ticketId, 'ticketId in ShowComments');
        fetchTicketComments(ticketId)
            .then(data => {
                setComments(data);
                console.log('Fetched comments:', data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [ticketId]);

    console.log('Comments:', comments);

    return (
        <div>
            <h3 className=" text-gray-400 font-bold mb-4">Comments</h3>
            {/* <ul>
                {comment.map(comment => (
                    <li key={comment.id} className="border-b pb-2">
                        <p className="font-semibold">{comment.author}
                            <small className="text-xs text-gray-500">{comment.CreatedAt}</small></p>
                        <p>{comment.text}</p>
                    </li>
                ))}
            </ul>*/}

            <ul className="">
                {
                    comments.map(res => (
                        <li key={res.id} className=" w-fit border-b-1 border-gray-200 pb-2">
                            <p className="font-semibold">{res.author}
                                <small className="text-xs text-gray-500">{res.userId}  -
                                    {res.createdAt.split('T')[0]} {res.createdAt.split('T')[1].split('.')[0]
                                    }</small></p>
                            <p>{res.text}</p>
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}

export default ShowComments
