import {MongoClient} from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/auth");
try{
    await client.connect();
    console.log("MongoDB connected successfully");
}catch(err){
    console.error("MongoDB connection error : ",err);
    process.exit(1);
}

const db = client.db('login');
const collection = db.collection("user");

