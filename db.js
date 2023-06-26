const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI, ()=>{
        console.log("Connected");
    })
}

module.exports = connectToMongo;
