import express from 'express';
import { addComment, updateComment } from '../controller/comment-controller';
const { generalAuth } = require("../auth/authourization");

const commentRouter = express.Router();

commentRouter.post('/comment',  generalAuth, addComment);
commentRouter.put('/:id',  generalAuth, updateComment);

export default commentRouter;