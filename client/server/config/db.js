const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://devinda:cC0oEaEBUHsDsTar@cluster0.awb49.mongodb.net/assignment");
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { connectDB };
