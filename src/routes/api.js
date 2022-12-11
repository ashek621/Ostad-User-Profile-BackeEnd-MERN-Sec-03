const  express=require('express')
const userControllers = require("../controllers/userControllers");
const router=express.Router();

router.post("/SignUp",userControllers.UserSignUp)

router.get("/LogIn",userControllers.UserLogIn);

router.post("/ChangePassword",userControllers.ChangePassword)

module.exports=router;