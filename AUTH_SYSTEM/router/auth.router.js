
import express from "express";

import { home,login, signup ,checkLogin ,checkSignup, logout } from "../controller/auth.controller.js";



 const router = express.Router();
// ..middleware work 
router.use(express.urlencoded({ extended: true }));


router.get("/", home);
router.get("/home", home);

router.get("/login", login);

router.get("/signup" , signup);

router.post("/checkLogin", checkLogin);

router.post("/checkSignup", checkSignup);

router.get("/logout", logout);




export default router;
