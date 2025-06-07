const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const User = require('./models/userModel');
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

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
