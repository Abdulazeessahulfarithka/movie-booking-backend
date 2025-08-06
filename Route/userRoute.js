import express from "express"
import {register,loginController} from "../Controller/userController.js"


const router=express.Router()

router.post("/register",register)


//login controller
router.post("/login",loginController)


export default router 