// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// const User = require('../../model/User');
// require('dotenv').config();
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/User';
import dotenv from 'dotenv';
dotenv.config();

export const generalAuth = asyncHandler(async (req: any, res: any, next) => {
  // Initializing the token
  let token;
  // Checking if there is token in the header and it start with a bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // Rapping into try and catch to avoid server crash incase of error
    try {
      // Geting the main token
      token = req.headers.authorization.split(' ')[1];
      console.log(token, 'Token');
      // Decoded token to verify the user
      console.log(jwt.verify(token, { secret: 'Ademolasodiq' } as any));
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log(decoded, 'Decoded');
      // Setting user to the found user in database
      req.user = await User.findById(decoded.id).select('-password');

      console.log(req.user, 'Req User');
      // Then pass the middleware to the next function
      next();
    } catch (error: any) {
      // Catching error incase of error
      return res.status(401).json({
        message: 'Authentication token failed, you are not authorized',
        error: error.message,
      });
    }
  }

  if (!token) {
    // If no token is provided
    return res.status(401).json({
      message: 'Authentication token not found',
    });
  }
});

export const isAdmin = (req: any, res: any, next: any) => {
  // Checking of there is a user and the user is admin
  if (req.user && req.user.isAdmin) {
    // If conditon is satisfy pass the next function
    next();
  } else {
    return res.status(401).json({
      message: 'Only admins can access this page.',
    });
  }
};
