import path from "path";
import { fileURLToPath } from "url";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import router from "../router/auth.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewpath = path.join(__dirname, "../views");

// generate salt
 const salt = await bcrypt.genSalt(10);



// ✅ Render Home Page
export const home = (req, res) => {
  res.render("home",{user :{}}); // No need to add .ejs if engine is set
  
};

// ✅ Render Login Page
export const login = (req, res) => {
  res.render("login");
};

// ✅ Render Signup Page
export const signup = (req, res) => {
  res.render("signup");
};

// ✅ Check Login Handler
export const checkLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
     if (!existingUser) {
  return res.status(400).render("login", { error: "User not found" });
}

    } 

    if(await bcrypt.compare(password , existingUser.password)){
        console.log("password matched succesfully");
     res.render("home",{user : existingUser});
    } else {
      return res.status(401).render("login", { error: "Invalid password" });

    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// ✅ Check Signup Handler
export const checkSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }
const bcryptPassword = await bcrypt.hash(password, 10);
    const signedUser = new User({
      firstname,
      lastname,
      email,
      password: bcryptPassword, // Hash this before save in production!
    });

    await signedUser.save();
    console.log("✅ User saved successfully");
    return res.status(201).render("login", { success: "User registered successfully" });

  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.status(500).send("Something went wrong");
  }
};


// logout model 
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
