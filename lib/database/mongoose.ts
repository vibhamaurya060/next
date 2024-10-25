import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

// Define a custom interface for the global object to avoid 'any'
declare global {
  // This declares that the global object has a 'mongoose' property of type MongooseConnection or undefined.
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use the declared global type instead of 'any'
let cached: MongooseConnection = global.mongoose || { 
  conn: null, 
  promise: null 
};

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'next', 
      bufferCommands: false 
    });

  cached.conn = await cached.promise;

  return cached.conn; // conn --> connection
};
