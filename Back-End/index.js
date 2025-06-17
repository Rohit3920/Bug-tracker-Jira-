const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const User = require('./models/userModel');
const Project = require('./models/projectModel');
const Ticket = require('./models/ticketModel');
const Comment = require('./models/commentModel');
const authToken = require('./middleware/authToken');

require("dotenv").config();
//database connection
require('./db/Config');
//json web token
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET_KEY;

//cors configuration
var corsOptions = {
    origin: "http://localhost:5173"
};
app.use(cors(corsOptions));
app.use(express.json());
const http = require('http').Server(app);

// Assuming you have your User model and jwtKey defined:
// const User = require('./models/User'); // Your Mongoose User model
// const Jwt = require('jsonwebtoken');
// const jwtKey = 'your-secret-key'; // Keep this secure and in environment variables!

// --- Centralized Error Handling Middleware ---
// This middleware should be placed early in your Express app setup (e.g., in app.js)
// It catches errors passed via next(error) and sends a consistent response.
app.use((err, req, res, next) => {
    console.error('API Error:', err.stack); // Log the full stack trace for debugging

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            errors: err.errors // Mongoose validation errors object
        });
    }

    // Handle invalid ObjectId format for /user/:id or other ID-based routes
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid ID format.' });
    }

    // Handle duplicate key errors (e.g., duplicate email during registration)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(', ');
        return res.status(409).json({
            message: `A user with this ${field} already exists. Please use a different one.`,
            field: field
        });
    }

    // Generic server error
    res.status(500).json({ message: 'An unexpected error occurred on the server.' });
});

// --------------------------API ROUTES--------------------------

// --- Register Route ---
app.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body; // Assuming name, email, password are sent

        // Basic input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required for registration." });
        }

        // Before creating, ensure password is HASHED.
        // Your User model's pre-save hook for password hashing should handle this.
        const user = await User.create({ name, email, password });

        // Optionally, remove password from the user object before sending response
        const userResponse = user.toObject();
        delete userResponse.password;

        // Generate JWT token upon successful registration
        const token = Jwt.sign({ _id: user._id, email: user.email }, jwtKey, { expiresIn: '2h' });

        res.status(201).json({ message: "User registered successfully!", token, user: userResponse });
    } catch (error) {
        next(error); // Pass error to the centralized error handling middleware
    }
});

// --- Login Route ---
app.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Basic input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required for login." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." }); // Use 401 for unauthorized
        }

        // Assuming user.comparePassword is an async method on your Mongoose User schema
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Optionally, remove password from the user object before sending response
        const userResponse = user.toObject();
        delete userResponse.password;

        // Generate JWT token
        const token = Jwt.sign({ _id: user._id, email: user.email }, jwtKey, { expiresIn: '2h' });

        res.status(200).json({ message: "Login successful!", token, user: userResponse });
    } catch (error) {
        next(error); // Pass error to the centralized error handling middleware
    }
});

// --- Get All Users Data ---
app.get('/user', async (req, res, next) => {
    try {
        const users = await User.find().select('-password -__v'); // Exclude password and __v from results
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

// --- Get User by ID ---
app.get('/user/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password -__v'); // Exclude password and __v

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});
// Before app.post/get/put/delete routes, define the Project model (e.g., from Mongoose)
// const Project = require('../models/Project'); // Assuming your Project model is defined here

// Centralized error handler middleware (add this higher up in your app.js/server.js)
// This will catch errors thrown in your route handlers and send a consistent response.
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message, errors: err.errors });
    }
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid ID format.' });
    }
    res.status(500).json({ message: 'Something went wrong on the server.' });
});

// Helper function to handle common responses (optional, but good for consistency)
const handleResponse = (res, promise) => {
    promise
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Resource not found." });
            }
            res.status(200).json(data);
        })
        .catch(err => {
            // Pass error to centralized error handler
            next(err); // This will call the app.use((err, req, res, next) => { ... })
        });
};


// Create project
app.post('/project/', async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
});

// Read all projects
app.get('/project/', async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

// Read only one project
app.get('/project/:id', async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

// Update project
app.put('/project/:id', async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Add runValidators
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

// Update team members array in project (add a team member)
app.put('/project/:id/team', async (req, res, next) => {
    try {
        // Validate teamMemberId in req.body
        if (!req.body.teamMemberId) {
            return res.status(400).json({ message: "teamMemberId is required." });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { teamMembers: req.body.teamMemberId } },
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

// Delete team members from teamMembers array
app.put('/project/:id/team/remove', async (req, res, next) => {
    try {
        // Validate teamMemberId in req.body
        if (!req.body.teamMemberId) {
            return res.status(400).json({ message: "teamMemberId is required." });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { $pull: { teamMembers: req.body.teamMemberId } },
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

// Delete project
app.delete("/project/:id", async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully", deletedProject: project });
    } catch (error) {
        next(error);
    }
});
// ticket APIS routes

// Middleware for authentication (assuming authToken is defined elsewhere)
// const authToken = require('./middleware/authToken'); // Example

// --- Add new Ticket ---
app.post('/ticket/', async (req, res) => {
    try {
        // Consider adding Joi or Express-validator for input validation here
        // IMPORTANT: Use req.body to access the data sent from the frontend
        const ticket = await Ticket.create(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        console.error('Error creating ticket:', error); // Log the error for debugging
        if (error.name === 'ValidationError') {
            // Mongoose validation errors
            return res.status(400).json({ error: error.message });
        }
        // Catch any other unexpected errors
        res.status(500).json({ message: 'An unexpected error occurred while creating the ticket.' });
    }
});

// --- Read All Tickets ---
app.get('/ticket/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error reading all tickets:', error);
        res.status(500).json({ message: 'An unexpected error occurred while fetching tickets.' });
    }
});

// --- Read All Tickets by Project ID ---
app.get('/project-ticket/:projectId', async (req, res) => {
    try {
        const tickets = await Ticket.find({ projectId: req.params.projectId });
        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ message: "No tickets found for this project." });
        }
        res.status(200).json(tickets);
    } catch (error) {
        console.error(`Error reading tickets for project ${req.params.projectId}:`, error);
        res.status(500).json({ message: 'An unexpected error occurred while fetching project tickets.' });
    }
});

// --- Read Ticket by ID ---
// Renamed route for consistency: /ticket/:id
app.get('/ticket/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error(`Error reading ticket ${req.params.id}:`, error);
        // Mongoose CastError for invalid ID format
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ticket ID format.' });
        }
        res.status(500).json({ message: 'An unexpected error occurred while fetching the ticket.' });
    }
});

// --- Update Ticket ---
// Renamed route for consistency: /ticket/:id
app.put('/ticket/:id', async (req, res) => {
    try {
        // Consider adding input validation here for req.body
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }
        console.log(ticket); // This log is fine for debugging
        res.status(200).json(ticket);
    } catch (error) {
        console.error(`Error updating ticket ${req.params.id}:`, error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ticket ID format.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ message: 'An unexpected error occurred while updating the ticket.' });
    }
});

// --- Delete Ticket ---
app.delete('/ticket/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }
        res.status(200).json({ message: "Ticket deleted successfully." });
    } catch (error) {
        console.error(`Error deleting ticket ${req.params.id}:`, error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ticket ID format.' });
        }
        res.status(500).json({ message: 'An unexpected error occurred while deleting the ticket.' });
    }
});

// --- Assign Ticket to User ---
app.put('/ticket/:id/assign', async (req, res) => {
    try {
        const { assigneeId } = req.body;
        if (!assigneeId) {
            return res.status(400).json({ message: "Assignee ID is required." });
        }
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { assignee: assigneeId },
            { new: true, runValidators: true } // runValidators ensures assigneeId is valid based on schema
        );
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error(`Error assigning ticket ${req.params.id}:`, error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ticket ID or assignee ID format.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ message: 'An unexpected error occurred while assigning the ticket.' });
    }
});

// --- Update Ticket Status ---
app.put('/ticket/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required." });
        }
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true, runValidators: true } // runValidators is important if 'status' has enum validation
        );
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error(`Error updating ticket status for ${req.params.id}:`, error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ticket ID format.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ message: 'An unexpected error occurred while updating the ticket status.' });
    }
});

// --- Add Comment to Ticket ---
app.post('/ticket/comment', async (req, res) => {
    try {
        const { text, userId, ticketId } = req.body;

        // Basic validation
        if (!text || !userId || !ticketId) {
            return res.status(400).json({ message: "Text, userId, and ticketId are required to add a comment." });
        }

        const comment = await Comment.create({ text, userId, ticketId });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment to ticket:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format for userId or ticketId.' });
        }
        res.status(500).json({ message: "An unexpected error occurred while adding the comment." });
    }
});

// --- Show Comment History of Ticket ---
app.get('/ticket/comment-history/:ticketId', async (req, res) => {
    try {
        const comments = await Comment.find({ ticketId: req.params.ticketId }).sort({ createdAt: 1 }); // Sort by creation date
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this ticket." });
        }
        res.status(200).json(comments);
    } catch (error) {
        console.error(`Error fetching comment history for ticket ${req.params.ticketId}:`, error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ticket ID format.' });
        }
        res.status(500).json({ message: "An unexpected error occurred while fetching comment history." });
    }
});
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
