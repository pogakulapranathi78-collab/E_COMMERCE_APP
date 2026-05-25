const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://pranathi:pranathi1357@ac-9hdg0gr-shard-00-00.2asbauc.mongodb.net:27017,ac-9hdg0gr-shard-00-01.2asbauc.mongodb.net:27017,ac-9hdg0gr-shard-00-02.2asbauc.mongodb.net:27017/?ssl=true&replicaSet=atlas-k12i48-shard-0&authSource=admin&appName=Cluster0");

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;