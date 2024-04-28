import { Request, Response, NextFunction  } from "express";
import User from '../model/User';
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/generateToken';


export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: 'users are not found' });
  }

  return res.status(200).json({ users });
};

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  let existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User is already exists!' });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    user.save();
    return res.status(201).json({ user });
  } catch (e: any) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: e.message,
    });
  }
};

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e: any) {
    console.log(e);
  }
  if (!existingUser) {
    return res.status(404).json({ message: 'User is not found' });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  const token = generateToken(existingUser._id);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Incorrect Password!' });
  }

  return res.status(200).json({
    message: 'You are logged in successfully',
    user: existingUser,
    token: token,
  });
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, isAdmin } = req.body;
  const id = req.params.id;

  let existingUser;
  try {
    existingUser = await User.findById(id);
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong getting user',
      error: error.message,
    });
  }

  if (!existingUser) {
    res.status(404).json({
      message: 'User not found',
    });
  }

  try {
    const user = await User.findOneAndUpdate({
      name,
      email,
      password,
    });

    return res.status(200).json({
      message: 'User updated successfully',
      user: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong updating user',
      error: error.message,
    });
  }
};

export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { isAdmin } = req.body;
  const id = req.params.id;

  let existingUser;
  try {
    existingUser = await User.findById(id);
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong getting user',
      error: error.message,
    });
  }

  if (!existingUser) {
    res.status(404).json({
      message: 'User not found',
    });
  }

  try {
    const user = await User.findOneAndUpdate({
      isAdmin,
    });

    return res.status(200).json({
      message: 'User updated successfully',
      user: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong updating user',
      error: error.message,
    });
  }
};
