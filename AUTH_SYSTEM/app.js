import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {PORT} from "./config/env.js";
import { connectDB } from "./config/mongodb.js";
import router from "./router/auth.router.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`dirname : ${__dirname}`);
console.log(`filename : ${__filename}`);

app.set("view engine", "ejs"); // ✅
app.set("views", path.join(__dirname, "views")); // ✅


app.use("/style", express.static(path.join(__dirname, "public/style")));
 app.use(router);
 

connectDB();

app.listen(PORT , ()=>{
    console.log(`The System is running on the PORT : ${PORT}`);
})


