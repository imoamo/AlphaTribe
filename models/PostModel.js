const mongoose = require('mongoose');

// Define the Post Schema
const PostSchema = mongoose.Schema({
    stockSymbol: {
        type: String,
        required: true // Symbol of the stock related to the post
    },
    title: {
        type: String,
        required: true // Title of the post
    },
    description: {
        type: String,
        required: true // Detailed description of the post
    },
    tags: [{
        type: String
        // Optional tags to categorize the post
    }],
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the current date/time when the post is created
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model to link the post with the user who created it
        required: true // Required field to associate the post with a user
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model for users who liked the post
        default: [] // Default to an empty array if no likes are present
    }]
});

// Create the Post model from the schema
const PostModel = mongoose.model('post', PostSchema);

module.exports = PostModel; // Export the Post model for use in other parts of the application
