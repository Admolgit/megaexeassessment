import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: "string",
    required: true,
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: 'Blog',
    require: true,
  },
})

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;