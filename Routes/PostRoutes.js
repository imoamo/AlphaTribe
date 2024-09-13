const express = require('express');
const Postrouter = express.Router();
const PostModel = require('../models/PostModel');
const authMiddleware = require('../middleware/authMiddleWare');

// Add a Comment to a Post
Postrouter.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
    const { postId } = req.params;  // Extract post ID from URL parameters
    const { comment } = req.body;  // Extract comment text from the request body
    const userId = req.body.userId; // Extract user ID from the request body (provided by authMiddleware)

    try {
        // Find the post by ID
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Add the new comment to the post's comments array
        post.comments.push({ userId, comment });
        await post.save(); // Save the updated post

        // Respond with success message and the ID of the newly added comment
        res.status(201).json({
            success: true,
            commentId: post.comments[post.comments.length - 1]._id,
            message: 'Comment added successfully'
        });
    } catch (error) {
        // Respond with an error message in case of failure
        res.status(500).json({
            message: 'Error adding comment',
            error
        });
    }
});

// Delete a Comment
Postrouter.delete('/posts/:postId/comments/:commentId', authMiddleware, async (req, res) => {
    const { postId, commentId } = req.params; // Extract post ID and comment ID from URL parameters
    const userId = req.body.userId; // Extract user ID from the request body (provided by authMiddleware)

    try {
        // Find the post by ID
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Find the comment by ID within the post's comments array
        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        // Check if the comment belongs to the user requesting the deletion
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        // Remove the comment from the post's comments array and save the post
        comment.remove();
        await post.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        // Respond with an error message in case of failure
        res.status(500).json({
            message: 'Error deleting comment',
            error
        });
    }
});

module.exports = Postrouter; // Export the router
