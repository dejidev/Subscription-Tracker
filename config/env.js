import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI, 
    JWT_SECRET, 
    JWT_EXPIRES_IN, 
    ARCJET_ENV, 
    ARCJET_KEY, 
    QSTASH_URL ,
    QSTASH_TOKEN,
    SERVER_URL
    // QSTASH_CURRENT_SIGNING_KEY,
    // QSTASH_NEXT_SIGNING_KEY 
    } = process.env;



//Password mongodb = "ayodeji@77" (Previous)

//Password = "ayodeji"

console.log("Loaded ENV:", process.env.PORT, process.env.NODE_ENV);

