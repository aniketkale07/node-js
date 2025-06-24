import mongoose from "mongoose";
import {MONGODB_URL} from './env.js';
 
const connectDB = async () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ DB Error:", err));
};

export {connectDB};