const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

const dbConnect = () => {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const uri = `mongodb+srv://${username}:${password}@cluster0.rl2miul.mongodb.net/AlphaTribe?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.connect(uri);
};

module.exports = dbConnect;
