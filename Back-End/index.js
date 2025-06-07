const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const User = require('./models/userModel');
const Project = require('./models/projectModel');
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
        .then(user =>  res.status(201).json(user))
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
        const token = Jwt.sign({ id: user._id }, jwtKey, { expiresIn: '2h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.log("some login user error");
        res.status(500).json(error);
    }
});

// project APIS routes
// create project
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

//updata team members array in project
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

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
