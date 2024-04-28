import express from 'express';
import userRouter  from "./routes/user-routes"
import blogRouter from "./routes/blog-routes"
import likeRouter from "./routes/like-routes"
import commentRouter from "./routes/comment-routes"
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db'

dotenv.config();
const app = express();

db();

app.use(cors());

app.set("view engine","ejs");
app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/blogs",blogRouter);
app.use("/api/likes", likeRouter);
app.use("/api/comments", commentRouter);

app.use("/api",(req,res,next) =>{
    res.send("hello")
})

//define port

app.listen(5000, () => console.log("app started at 5000..."));