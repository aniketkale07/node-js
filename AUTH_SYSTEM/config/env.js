import dotenv from "dotenv";
import zod from "zod";

dotenv.config();
// 1. validation for PORT 
// 2. validation for   MONGODB_URL 

const PORT = process.env.PORT || 3000;

 const MONGODB_URL = process.env.MONGODB_URL;

export {PORT, MONGODB_URL}