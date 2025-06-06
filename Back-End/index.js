const express = require('express');
const app = express();
const dotenv = require("dotenv");
const PORT = 5000;

//database connection
require('./db/Config');
dotenv.config();
app.use(express.json());

const http = require('http').Server(app);


http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//First route

app.get('/api/user', async (req, res) => {
    try {
        const User = require('./models/userModel'); // Import the User model here
        const newUser = new User({
            username: "demo1",
            email: "demo1@gmail.com",
            password: "12345678",
            role: "user",
        });

        const user = await newUser.save();
        res.status(200).json(user);
        console.log("user created successfully");
    } catch (err) {
        console.log("some error occur");
        res.status(500).json(err);
    }
});
app.get('/', (req, res) => {
    res.send('API is running...');
});
