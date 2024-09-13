const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb+srv://imoamo:imo786yo@cluster0.rl2miul.mongodb.net/AlphaTribe?retryWrites=true&w=majority&appName=Cluster0')
}

module.exports = dbConnect;