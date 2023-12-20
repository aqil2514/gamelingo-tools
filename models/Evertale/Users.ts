import mongoose, { Schema, SchemaType } from "mongoose";

interface User {
  username: String;
  name: String;
  email: String;
  role: "User" | "Admin" | "Moderator" | "General Admin";
  avatar: String;
  isVerified: Boolean;
  socialMedia: {
    facebook: String;
    twitter: String;
    instagram: String;
  };
  gender: "Pria" | "Wanita" | "Rahasia";
  bio: String;
}

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, minlengt: 6, maxlength: 20, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["User", "Admin", "Moderator", "General Admin"], default: "User" },
    avatar: { type: String, default: "/no-profile.png" },
    isVerified: { type: Boolean, default: false },
    socialMedia: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
    gender: { type: String, enum: ["Pria", "Wanita", "Rahasia"] },
    bio: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.UserInfo || mongoose.model("UserInfo", UserSchema);
export default User;
