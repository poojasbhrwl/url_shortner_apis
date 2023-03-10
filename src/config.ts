import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()
export default class Database {
  constructor() {
    this._connect()   // call function to connect with database
  }
  
_connect() {
  // connection function for mongoose
     mongoose.connect(`mongodb://${process.env.MONGOSERVER}/${process.env.DATABASE}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch((err: any) => {
         console.error('Database connection error',err)
       })
  }
}