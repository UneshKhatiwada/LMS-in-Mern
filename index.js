const mongoose = require('mongoose')

const connectionString = "mongodb+srv://subarna:8848vodaka@subarna.gkd7ug6.mongodb.net/?retryWrites=true&w=majority"


async function conncetToDatabase(){
    await mongoose.connect(connectionString)
    console.log("Connected To DB Successfully")
}

module.exports = conncetToDatabase
