import express from 'express';
import { generalAuth } from '../auth/authourization';
const blogRouter = express.Router();
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
} from '../controller/blog-controller';

blogRouter.get('/', generalAuth, getAllBlogs);
blogRouter.post('/add', generalAuth, addBlog);
blogRouter.put('/update/:id', generalAuth, updateBlog);
blogRouter.get('/:id', generalAuth, getById);
blogRouter.delete('/:id', generalAuth, deleteBlog);
blogRouter.get('/user/:id', generalAuth, getByUserId);

export default blogRouter;
