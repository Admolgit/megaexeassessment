import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    desc :  {
        type: String,
        required: true,
    },
    img :  {
        type: String,
        required: true,
    },
    user : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        require: true,
    }],
    like: [{
        type: mongoose.Types.ObjectId,
        ref: "Like",
        require: true,
    }]
})

const Blog =  mongoose.model("Blog", blogSchema);
export default Blog;