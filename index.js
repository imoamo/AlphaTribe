const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/config');
const UserRoute = require('./Routes/UserRoutes');
const Postrouter = require('./Routes/PostRoutes');
const CommentRouter = require('./Routes/CommentRoutes');
const LikeRouter = require('./Routes/LikeRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Routes
app.use("/api/users", UserRoute); // User-related routes
app.use("/api/posts", Postrouter); // Post-related routes
app.use("/api/posts/:postId/comments", CommentRouter); // Comment-related routes, dependent on postId
app.use("/api/posts/:postId/like", LikeRouter); // Like-related routes, dependent on postId

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Home Page"); // Welcome message for the home route
});

// Server and Database Connection
app.listen(PORT, async () => {
    try {
        await dbConnect(); // Connect to the database
        console.log('Connected to DB Successfully!');
    } catch (error) {
        console.log('Unable to Connect to DB', error); // Error handling for database connection
    }
    console.log(`Server is running on PORT ${PORT}`); // Server running message
});
