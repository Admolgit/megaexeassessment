import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  like: {
    type: Boolean,
    required: true,
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: 'Blog',
    require: true,
  },
});

const Like = mongoose.model('Like', likeSchema);
export default Like;