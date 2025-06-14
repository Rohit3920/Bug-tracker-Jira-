const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const User = require('./models/userModel');
const Project = require('./models/projectModel');
const Ticket = require('./models/ticketModel');
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

// --------------------------API ROUTES--------------------------
// create register route
app.post('/register', (req, res) => {
    try {
        User.create(req.body)
            .then(user => res.status(201).json(user))
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (err) {
        console.log("some register user error");
        res.status(500).json(err);
    }
});

// create login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = Jwt.sign({user}, jwtKey, { expiresIn: '2h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.log("some login user error");
        res.status(500).json(error);
    }
});

// get user data
app.get('/user', (req, res) => {
    try {
        User.find()
            .then(users => res.status(200).json(users))
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

// get user by id
app.get('/user/:id', (req, res) => {
    try {
        User.findOne(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//create project
app.post('/project/', (req, res) => {
    try {
        Project.create(req.body)
            .then(project => res.status(201).json(project))
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//read all project
app.get('/project/', (req, res) => {
    try {
        Project.find()
            .then(projects => res.status(200).json(projects))
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

// read only one project
app.get('/project/:id', (req, res) => {
    try {
        Project.findById(req.params.id)
            .then(project => {
                if (!project) {
                    return res.status(404).json({ message: "Project not found" });
                }
                res.status(200).json(project);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

// update project
app.put('/project/:id', (req, res) => {
    try {
        Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(project => {
                if (!project) {
                    return res.status(404).json({ message: "Project not found" });
                }
                res.status(200).json(project);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//update team members array in project
app.put('/project/:id/team', (req, res) => {
    try {
        Project.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { teamMembers: req.body.teamMemberId } },
            { new: true }
        )
            .then(project => {
                if (!project) {
                    return res.status(404).json({ message: "Project not found" });
                }
                res.status(200).json(project);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//Delete team members in teamMember array
app.put('/project/:id/team/remove', (req, res) => {
    try {
        Project.findByIdAndUpdate(
            req.params.id,
            { $pull: { teamMembers: req.body.teamMemberId } },
            { new: true }
        )
            .then(project => {
                if (!project) {
                    return res.status(404).json({ message: "Project not found" });
                }
                res.status(200).json(project);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
})

// delete project
app.delete("/project/:id", (req, res) => {
    try {
        Project.findByIdAndDelete(req.params.id)
            .then(project => {
                if (!project) {
                    return res.status(404).json({ message: "Project not found" });
                }
                res.status(200).json({ message: "Project deleted successfully" });
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

// ticket APIS routes
//create ticket
app.post('/ticket/', authToken, (req, res) => {
    try {
        Ticket.create(req.body.data)
            .then(ticket => res.status(201).json(ticket))
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//read all tickets
app.get('/ticket/', (req, res) => {
    try {
        Ticket.find()
            .then(tickets => res.status(200).json(tickets))
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//read all tickets by project id
app.get('/project-ticket/:projectId', (req, res) => {
    try {
        Ticket.find({ projectId: req.params.projectId })
            .then(tickets => res.status(200).json(tickets))
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//read ticket by id
app.get('/update-ticket/:id', (req, res) => {
    try {
        Ticket.findById(req.params.id)
            .then(ticket => {
                if (!ticket) {
                    return res.status(404).json({ message: "Ticket not found" });
                }
                res.status(200).json(ticket);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//update ticket
app.put('/update-ticket/:id', (req, res) => {
    try {
        Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(ticket => {
                if (!ticket) {
                    return res.status(404).json({ message: "Ticket not found" });
                }
                console.log(ticket)
                res.status(200).json(ticket);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//delete ticket
app.delete('/ticket/:id', (req, res) => {
    try {
        Ticket.findByIdAndDelete(req.params.id)
            .then(ticket => {
                if (!ticket) {
                    return res.status(404).json({ message: "Ticket not found" });
                }
                res.status(200).json({ message: "Ticket deleted successfully" });
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});

//assign ticket to user
app.put('/ticket/:id/assign', (req, res) => {
    try {
        Ticket.findByIdAndUpdate(
            req.params.id,
            { assignee: req.body.assigneeId },
            { new: true }
        )
            .then(ticket => {
                if (!ticket) {
                    return res.status(404).json({ message: "Ticket not found" });
                }
                res.status(200).json(ticket);
            })
            .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(400).send(error);
    }
});


http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
