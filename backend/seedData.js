const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('./models/transactionModel');
require('dotenv').config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB for seeding data');

        // Fetch data from URL
        const response = await axios.get(process.env.DATA_URL);
        const transactions = response.data;

        // Insert data into the database
        await Transaction.insertMany(transactions);
        console.log('Data successfully seeded into the database');

        // Close the connection
        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedData();
