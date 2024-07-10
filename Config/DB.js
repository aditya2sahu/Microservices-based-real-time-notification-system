require('dotenv').config()
const mongoose = require('mongoose')

const mongoDbURI = process.env.MONGO_URI;

const MongoClient = async () => {
    try {
        await mongoose.connect(mongoDbURI)
        console.log("Database Connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = MongoClient