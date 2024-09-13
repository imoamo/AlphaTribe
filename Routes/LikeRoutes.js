const express = require('express');
const LikeRouter = express.Router();
const PostModel = require('../models/PostModel');
const authMiddleware = require('../middleware/authMiddleWare');

// Like a Post
LikeRouter.post('/posts/:postId/like', authMiddleware, async (req, res) => {
    // Extract postId from URL parameters and userId from request body
    const { postId } = req.params;
    const userId = req.body.userId;

    try {
        // Find the post by ID
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if the post is already liked by the user
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: 'Post already liked' });
        }

        // Add the userId to the likes array and save the updated post
        post.likes.push(userId);
        await post.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: 'Post liked'
        });
    } catch (error) {
        // Respond with an error message if something goes wrong
        res.status(500).json({
            message: 'Error liking post',
            error
        });
    }
});

// Unlike a Post
LikeRouter.delete('/posts/:postId/like', authMiddleware, async (req, res) => {
    // Extract postId from URL parameters and userId from request body
    const { postId } = req.params;
    const userId = req.body.userId;

    try {
        // Find the post by ID
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if the post is liked by the user
        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: 'Post not liked yet' });
        }

        // Remove the userId from the likes array and save the updated post
        post.likes.pull(userId);
        await post.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: 'Post unliked'
        });
    } catch (error) {
        // Respond with an error message if something goes wrong
        res.status(500).json({
            message: 'Error unliking post',
            error
        });
    }
});

module.exports = LikeRouter; // Export the router to use in other parts of the application
