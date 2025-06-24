import mongoose from "mongoose";
import { lowercase } from "zod/v4";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true, lowercase:true },
  password: { type: String, required: true },
  firstname :{type:String, required:true},
  lastname:{ type:String , required : true},
  lastLoginAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
