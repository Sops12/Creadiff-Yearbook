import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI environment variable is not set. Database functionality will be limited.');
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/creadiff';
const options = {};

let client;
let clientPromise;

if (process.env.MONGODB_URI) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  // Return a mock promise if no MongoDB URI is provided
  clientPromise = Promise.resolve(null);
}

export default clientPromise; 