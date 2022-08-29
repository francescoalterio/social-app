import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  posts: [
    {
      title: String,
      userId: String,
      author: String,
      comments: [{ author: String, comment: String }],
    },
  ],
});

export default mongoose.models.User || model("User", UserSchema);
