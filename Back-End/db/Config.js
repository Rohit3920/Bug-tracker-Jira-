const mongoose = require('mongoose');
const URL = "mongodb+srv://rohitnittawadekar07:cJT9JAPsfANsfHcR@bug-tracker.qeeiwpy.mongodb.net/?retryWrites=true&w=majority&appName=bug-tracker"

mongoose.connect(URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);