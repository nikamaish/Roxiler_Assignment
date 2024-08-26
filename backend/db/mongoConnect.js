const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const mongoConnect = () => {
    if (!mongoURI) {
        console.error('MONGO_URI is not defined');
        process.exit(1); // Exit the process with failure
    }

    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Error while connecting to MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });
};

module.exports = mongoConnect;
