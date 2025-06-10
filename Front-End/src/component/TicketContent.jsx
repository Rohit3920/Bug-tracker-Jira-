import React, { useState } from 'react';
import axios from 'axios'

const CreateTicketForm = () => {
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState("medium");
    const [assign, setAssign] = useState([]);
    const [status, setStatus] = useState("open");
    const [project, setProject] = useState("");

    const formData = {
        title: title,
        description: desc,
        priority: priority,
        assignee: assign,
        status: status,
        project: project,
        createdAt: date,
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.assignee) {
            alert('Please fill in all required fields (Title, Description, Assignee).');
            return;
        }

        const headers = {
            'authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        const data = {
            title,
            description: desc,
            priority,
            status,
            assign: "6843cb5390b184e9813d8c2c",
            projectId: "68450db4263e8c3b2c840f9a",
            date
        }

        axios.post('http://localhost:5000/ticket/', { data, headers })
            .then((response) => {
                console.log("Response : ", response.data);
            }).catch((error) => {
                console.error("There was an error creating a ticket!", error);
            });

        console.log(formData)
    };

    return (
        <div className="create-ticket-form-container">
            <h2>Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="ticket-form">

                <div className="form-group">
                    <label htmlFor="ticket-title">Title:</label>
                    <input type="text" id="ticket-title"
                        name="title"
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={e => setDesc(e.target.value)}
                        rows="5"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="assign">Assign :</label>
                    <input type="text" onChange={e => setAssign(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        id="priority"
                        name="priority"
                        onChange={e => setPriority(e.target.value)}>
                        <option value="medium" disabled>Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="" disabled>Select Status</option>
                        <option value="open">Open</option>
                        <option value="in progress">In Progress</option>
                        <option value="to do">To Do</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="project">Project/Module:</label>
                    <select
                        id="project"
                        name="project"
                        onChange={e => setProject(e.target.value)}
                    >
                        <option value="" disabled>Select Project</option>
                        <option value="abc">ABC</option>
                        <option value="xyz">XYZ</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="createdAt">Created Date: </label>
                    <input
                        type="date"
                        id="createdAt"
                        name="createdAt"
                        onChange={e => setDate(e.target.value)} />
                </div>

                <button type="submit">Create Ticket</button>
            </form>
        </div>
    );
};

export default CreateTicketForm;