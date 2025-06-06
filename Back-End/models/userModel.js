const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        role: {
            type: String,
            enum: ["user", "admin", "developer", "tester"],
            default: "user",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);