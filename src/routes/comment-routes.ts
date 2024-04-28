const express = require('express');
const { addComment, updateComment } = require('../controller/comment-controller');
const { generalAuth } = require("../auth/authourization");

const commentRouter = express.Router();

commentRouter.post('/comment',  generalAuth, addComment);
commentRouter.put('/:id',  generalAuth, updateComment);

export default commentRouter;