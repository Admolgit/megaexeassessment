import express from 'express';
import { addLike, deleteLike } from '../controller/like-controller';
import { generalAuth } from '../auth/authourization';

const likeRouter = express.Router();

likeRouter.post('/like', generalAuth, addLike);
likeRouter.delete('/delete/:id',  generalAuth, deleteLike);

export default likeRouter;