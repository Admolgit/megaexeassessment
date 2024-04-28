import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    blogs: [{ type: mongoose.Types.ObjectId, ref: 'Blog', required: true }],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
export default User;
