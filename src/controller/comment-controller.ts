import mongoose from "mongoose";
import { Request, Response, NextFunction  } from "express";
import Comment from "../model/comment";
import Blog from "../model/Blog";

export const addComment = async (req: Request, res: Response) => {
  const { comment, blog } = req.body;

  console.log(comment, blog)

  let existingBlog;
  try {
    existingBlog = await Blog.findById(blog);
  } catch (error: any) {
    return res.status(404).json({
      message: 'Blog not found',
      error: error.message,
    });
  }

  const newComment = new Comment({
    comment,
    blog,
  });

  try {
    await newComment.save();
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating comment',
    });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newComment.save(session);
    existingBlog.comment.push(newComment);
    await existingBlog.save(session);
    session.commitTransaction();
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: 'Mongo transaction fails on blog session',
      error: err.message,
    });
  }

  return res.status(201).json({
    message: 'Mongo transaction successfully',
    comment: newComment
  })
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.params.id;
  const { comment, blog } = req.body;

  let existingComment;
  try {
    existingComment = await Comment.findByIdAndUpdate(commentId, {
      comment,
      blog
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Error updating comment'
    })
  }

  if(!existingComment) {
    return res.status(500).json({ message: 'Unable to update comment' });
  }

  return res.status(200).json({
    message: 'Comment updated successfully',
    comment: existingComment
  });
}
