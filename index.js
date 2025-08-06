import express from "express"
import * as dotenv from "dotenv"
import db from "./Config/db.js"
import userrouter from "./Route/userRoute.js"
import movierouter from "./Route/movieRoute.js"
import bookticket from "./Route/bookticketRoute.js"

dotenv.config()

const app =express()


//database connection
 db()

 // middlewares
 app.use(express.json())

//middlewares
app.use(express.json());


app.use(express.urlencoded({ extended: false }));

const PORT =process.env.PORT

//router 
app.use("/api/user",userrouter)
app.use("/api/movie",movierouter)
app.use("/api/ticket",bookticket)

app.get("/",(res,req)=>{
    res.send("hello world")
})


app.listen(PORT,()=>{
    console.log("server is connected ")
})