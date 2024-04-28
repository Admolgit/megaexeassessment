import mongoose from "mongoose";
import logger from "./logger.config";
import dotenv from "dotenv";
dotenv.config()

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
const connect = () => {
  mongoose
    .connect(`mongodb+srv://megaexe:Zealous890.@cluster0.lwhqnjb.mongodb.net/megaexe`)
    .then(() => console.log('mongoDB connected...'));
  return mongoose.connection;
};

export default connect;
