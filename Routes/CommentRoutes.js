const express = require('express');
const CommentRouter  = express.Router();
const PostModel = require('../models/PostModel');
const authMiddleware = require('../middleware/authMiddleWare');

// Add a Comment to a Post
CommentRouter .post('/posts/:postId/comments', authMiddleware, async (req, res) => {
    // Extract postId from URL parameters and comment and userId from request body
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.body.userId;

    try {
        // Find the post by ID
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Add the comment to the post's comments array
        post.comments.push({ userId, comment });
        await post.save(); // Save the updated post

        // Respond with success and the new comment's ID
        res.status(201).json({
            success: true,
            commentId: post.comments[post.comments.length - 1]._id,
            message: 'Comment added successfully'
        });
    } catch (error) {
        // Respond with an error message if something goes wrong
        res.status(500).json({
            message: 'Error adding comment',
            error
        });
    }
});

// Delete a Comment
CommentRouter .delete('/posts/:postId/comments/:commentId', authMiddleware, async (req, res) => {
    // Extract postId and commentId from URL parameters and userId from request body
    const { postId, commentId } = req.params;
    const userId = req.body.userId;

    try {
        // Find the post by ID
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Find the comment by ID within the post's comments array
        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        // Check if the user is authorized to delete the comment
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        // Remove the comment and save the updated post
        comment.remove();
        await post.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        // Respond with an error message if something goes wrong
        res.status(500).json({
            message: 'Error deleting comment',
            error
        });
    }
});

module.exports = CommentRouter ; // Export the router to use in other parts of the application
