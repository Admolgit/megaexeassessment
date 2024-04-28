import mongoose from "mongoose";
import { Request, Response, NextFunction  } from "express";
import Like from '../model/like';
import Blog from "../model/Blog";

export const addLike = async (req: Request, res: Response, next: NextFunction) => {
  const { like, blog } = req.body;
  let existingBlog;
  try {
    existingBlog = await Blog.findById(blog);
  } catch (e) {
    return console.log(e);
  }

  if(!existingBlog) {
    return res.status(404).json({
      message: 'Blog not found',
    })
  }

  const newLike = new Like({
    like,
    blog
  });

  try {
    await newLike.save();
  } catch (error: any) {
    return res.status(500).json({
      message: 'Error creating new like',
      error: error.message
    })
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newLike.save(session);
    existingBlog.like.push(newLike);
    await existingBlog.save(session);
    session.commitTransaction();
  } catch (err: any) {
    return res.status(500).json({ 
      message: "Something went wrong",
      error: err.message
    });
  }
  return res.status(200).json({ 
    message: "Like created",
    newLike,
  });
}

export const deleteLike = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  console.log(id)

  let blog;
  try {
    blog = await Blog.findById(id);
    // await blog.like.pull(blog);
    // await blog.save()
  } catch (error: any) {
    return res.status(404).json({
      message: "Unable to delete like",
      error: error.message
    });
  }

  if(!blog) {
    return res.status(404).json({
      message: "Like not found",
    });
  }

  return res.status(200).json({
    message: "Like deleted successfully",
  });
}