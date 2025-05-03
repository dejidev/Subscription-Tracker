import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js"

if (!DB_URI) {
    throw new Error("Please define the MONGODB_URI env variable inside .env.<developement/production>.local");
}


const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to Database in ${NODE_ENV} mode`);

    }
    catch (error) {
        console.error("Error connecting to Database", error);

        process.exit(1);
    }
}

export default connectToDatabase;






// database/mongodb.js

// import { MongoClient, ServerApiVersion } from "mongodb";
// import { DB_URI, NODE_ENV } from "../config/env.js";



// if (!DB_URI) {
//     throw new Error("Please define the DB_URI env variable inside .env.<development/production>.local");
// }

// const client = new MongoClient(DB_URI, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// const connectToDatabase = async () => {
//     try {
//         await client.connect();
//         await client.db("admin").command({ ping: 1 });

//         console.log(`Connected to Database in ${NODE_ENV} mode`);
//     } catch (error) {
//         console.error("Error connecting to Database", error);
//         process.exit(1);
//     }
// };

// export default connectToDatabase;
