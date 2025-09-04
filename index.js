import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import db from "./Config/db.js";
import userrouter from "./Route/userRoute.js";
import movierouter from "./Route/movieRoute.js";
import bookticket from "./Route/bookticketRoute.js";
import recommendrouter from "./Route/updatemovieRoute.js";

dotenv.config();

const app = express();

// Database connection
db();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// CORS Configuration
app.use(cors({
  origin: [
    "https://bookmyshowtime.netlify.app", // Your Netlify domain
    "http://localhost:3000"              // Local development
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 5000;

// Routers
app.use("/api/user", userrouter);
app.use("/api/movie", movierouter);
app.use("/api/ticket", bookticket);
app.use("/api/recommend", recommendrouter);

// Test route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});
