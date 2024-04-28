import express from 'express';
import { generalAuth, isAdmin } from '../auth/authourization';
import {  getAllUser , signUp ,logIn, updateUser, updateAdmin } from '../controller/user-contoller';
const userRouter = express.Router();


userRouter.get("/", generalAuth, isAdmin, getAllUser);
userRouter.post("/signup", signUp);
userRouter.post("/login" , logIn);
userRouter.put("/userupdate", updateUser)
userRouter.put("/adminupdate", updateAdmin)

export default userRouter;