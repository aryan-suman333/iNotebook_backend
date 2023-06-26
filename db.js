const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI, ()=>{
        console.log("Connected");
    })
}

module.exports = connectToMongo;
