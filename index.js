import express from "express";
import * as dotenv from "dotenv";
import cors from "cors"
import morgan from "morgan"
import db from "./Config/db.js";
import userrouter from "./Route/userRoute.js";
import movierouter from "./Route/movieRoute.js";
import bookticket from "./Route/bookticketRoute.js";

dotenv.config();

const app = express();

// Database connection
db();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

// Routers
app.use("/api/user", userrouter);
app.use("/api/movie", movierouter);
app.use("/api/ticket", bookticket);

// Test route
app.get("/", (req, res) => {   // ✅ Fixed
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
});
