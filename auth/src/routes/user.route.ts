import express, { Request, Response } from "express";
import {
  loginUser,
  currentUserInfo,
  signout,
  registerUser,
} from "../controllers/user.controller";
import { currentUser, requireAuth } from "@s7adev/common";

const userRouter = express.Router();

userRouter.get('/',(req:Request,res:Response)=>{
  res.send("Reacheed Auth")
})

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/currentUser", currentUser, requireAuth, currentUserInfo);

userRouter.post("/signOut", currentUser, requireAuth, signout);

export default userRouter;
