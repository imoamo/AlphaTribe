const express = require('express');
const UserRoute = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const authMiddleware = require('../middleware/authMiddleWare');

// POST Request (Register User)
// Endpoint for registering a new user
UserRoute.post("/auth/register", async (req, res) => {
    const { username, email, password, bio, profilepic } = req.body;

    try {
        // Check if user already exists in the database
        const user_exist = await UserModel.findOne({ email });
        if (user_exist) {
            return res.status(409).json({
                message: "User already registered"
            });
        }

        // Hash the user's password before saving to database
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: "Error while hashing the password"
                });
            }

            // Create a new user with the hashed password
            const user = new UserModel({
                username,
                email,
                password: hash,
                bio,
                profilepic
            });

            // Save the new user to the database
            await user.save();
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                userId: user._id
            });
        });
    } catch (error) {
        res.status(400).json({
            message: "Error while registering the user",
            error
        });
    }
});

// POST Request (Login User)
// Endpoint for logging in a user
UserRoute.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user_exist = await UserModel.findOne({ email });
        if (!user_exist) {
            return res.status(404).json({
                message: "User not found, please register first"
            });
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user_exist.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({
                    message: "Wrong Password!"
                });
            }

            // Generate a JWT token for the user
            const token = jwt.sign(
                { userId: user_exist._id, user: user_exist.username },
                'masai' // Secret key should ideally be stored in environment variables
            );

            // Return success response with token and user details
            res.status(200).json({
                message: "User logged in successfully",
                token,
                user: {
                    id: user_exist._id,
                    username: user_exist.username,
                    email: user_exist.email
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while logging in the user",
            error
        });
    }
});

// GET Request (Get User Profile)
// Endpoint to fetch user profile by user ID, protected by authentication middleware
UserRoute.get("/user/profile/:userId", authMiddleware, async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch the user profile from the database
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Return user profile data
        res.status(200).json({
            id: user._id,
            username: user.username,
            bio: user.bio,
            profilePicture: user.profilepic
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user profile",
            error
        });
    }
});

// PATCH Request (Update User Profile)
// Endpoint for updating user profile, protected by authentication middleware
UserRoute.patch("/user/profile", authMiddleware, async (req, res) => {
    const { username, bio, profilepic } = req.body;
    const { userId } = req;

    try {
        // Check if user exists in the database
        const user_exist = await UserModel.findById(userId);
        if (!user_exist) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        // Prepare fields to be updated
        const updateFields = {};
        if (username) updateFields.username = username;
        if (bio) updateFields.bio = bio;
        if (profilepic) updateFields.profilepic = profilepic;

        // Update the user profile
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        // Respond with success message
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user profile",
            error
        });
    }
});

module.exports = UserRoute;
