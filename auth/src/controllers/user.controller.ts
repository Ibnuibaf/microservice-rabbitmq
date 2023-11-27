import { Request, Response } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";


interface IRegisterUser {
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IRegisterUser = req.body;
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    const user: IRegisterUser = await userModel.create({
      email,
      password,
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  interface ILoginUser {
    email: string;
    password: string;
  }
  const { email, password }: ILoginUser = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not registered",
      });
    }
    if (user.password !== password) {
      return res.send({
        success: false,
        message: "password not match",
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email  }, "123");
    res.cookie("token", token);

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const currentUserInfo = async (req: Request, res: Response) => {
  res.send({ success: true, currentUser: req.currentUser });
};

export const signout = async (req: Request, res: Response) => {
  try {

    res.status(200).send({
      success: true,
      message: "Signout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};