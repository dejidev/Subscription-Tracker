import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";


const app = express();

app.use(express.json()); //Allow apps to handle json data sent in request or API call
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //Read cookie from incoming request so app can store incoming data.
// app.use(arcjetMiddleware);

//api/v1/auth
app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.json({ body: "Welcome to the subscription tracker API" });
});

console.log(PORT);


app.listen(PORT, async () => {
    console.log(`Server is running on port https://localhost:${PORT} `);

    await connectToDatabase();
    console.log("Connected to Database");

});

export default app;








// login
// {
//     "email": "joh@example.com",
//         "password": "securepasswod123"
// }

// id ="6810c1e602641bace6f55c42"

// {
//     "name": "netflix premium",
//     "price": "50.99",
//     "currency": "USD",
//     "frequency": "monthly",
//     "category": "entertainment",
//     "startDate": "2024-02-12",
//     "paymentMethod": "creadit card"
// }