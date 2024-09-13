const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensures unique usernames
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures unique email addresses
    },
    password: {
        type: String,
        required: true // Required for authentication
    },
    bio: {
        type: String,
        required: true // User biography or description
    },
    profilepic: {
        type: String,
        required: true // URL or path to profile picture
    },
    userId: {
        type: String // Optional field for additional user ID
    },
    user: {
        type: String // Optional field for username or other identifier
    }
}, {
    versionKey: false // Disables the "__v" version key in the document
});

// Create the User model from the schema
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel; // Export the User model for use in other parts of the application
