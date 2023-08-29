import mongoose from "mongoose";
import log from "./logger";
import dotenv from 'dotenv';

dotenv.config();

async function connect() {

    const dbUri = process.env.DB_CONNECTION as string;

    try {
        await mongoose.connect(dbUri)
        log.info(`Connected to the Database`)
    } catch (err) {
        log.error(`Could not connect to the Database: Error: ${err}: WOW ${dbUri}`);
        process.exit(1);
    }
}


export default connect