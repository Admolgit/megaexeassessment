import mongoose from "mongoose";
import { Request, Response, NextFunction  } from "express";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction ) => {
  let blogs;
  try {
    blogs = await Blog.find()
                   .populate('comment')
                   .populate("like");
  } catch (e) {
    console.log(e);
  }

  if (!blogs) {
    return res.status(404).json({ message: ' No blogs found' });
  }

  return res.status(200).json({ blogs });
};

export const addBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc, img, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (e) {
    return console.log(e);
  }
  if (!existingUser) {
    return res.status(400).json({ message: ' Unautorized' });
  }
  const blog = new Blog({
    title,
    desc,
    img,
    user,
  });

  try {
    await blog.save();
  } catch (e) {
    return console.log(e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save(session);
    existingUser.blogs.push(blog);
    await existingUser.save(session);
    session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.params.id;
  const { title, desc } = req.body;

  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      desc,
    });
  } catch (e) {
    return console.log(e);
  }

  if (!blog) {
    return res.status(500).json({ message: 'Unable to update' });
  }

  return res.status(200).json({ 
    message: "Blog updated successfully",
    blog: blog 
  });
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(id);
  } catch (e) {
    return console.log(e);
  }

  if (!blog) {
    return res.status(500).json({ message: 'not found' });
  }

  return res.status(200).json({ blog });
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate('user');
    console.log(blog, 'remove')
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (e) {
    console.log(e);
  }
  console.log(blog, "Outside");
  if (!blog) {
    return res.status(500).json({ message: 'Unable to delete' });
  }
  return res.status(200).json({ message: 'Successfuly deleted' });
};

export const getByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate('blogs');
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: 'No Blog Found' });
  }
  return res.status(200).json({ user: userBlogs });
};


