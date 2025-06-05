
const app = require('express')();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const PORT =  5000;
mongoose.connect("mongodb+srv://rohitnittawadekar07:cJT9JAPsfANsfHcR@bug-tracker.qeeiwpy.mongodb.net/?retryWrites=true&w=majority&appName=bug-tracker")

// sample mmodel 
require('./models/userModel');

async function insetUser() {
    const User = require('./models/userModel');
    const user = new User({
        name: 'Rohit Nittawadekar',
        email: 'rohit@example.com',
        password: 'password123',
        role: 'user',
    });
    await user.save();
}
insetUser().then(() => {
    console.log('User inserted successfully');
});


http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//First route
app.get('/', (req, res) => {
    res.send('API is running...');
});
