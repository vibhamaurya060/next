

import { Mongoose } from 'mongoose';

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // Extend the NodeJS global interface to include a custom property 'mongoose'
  namespace NodeJS {
    interface Global {
      mongoose: MongooseConnection;
    }
  }
}

// Allow TypeScript to treat this file as a module
export {};
