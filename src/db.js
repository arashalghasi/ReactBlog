import { MongoClient } from "mongodb";

let db;

async function connectToDd(cb){
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@fullstack-blog.u4gzmqv.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    db =  client.db('react-blog-db');
    cb();
}

export{
    db, connectToDd,
}