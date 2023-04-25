const router =require("express").Router();

const { registeredCourse } = require("../controller/registration.controller");
const { createANewUser, userLogin, updateUserProfile, getAllServices, getAllCourses } = require("../controller/user.controller");
const auth = require("../middleware/auth");
const { validateRequest, schemas } = require("../utils/validator");



router.post("/signup", validateRequest(schemas.signupSchema), createANewUser)
router.post("/login", validateRequest(schemas.loginSchema), userLogin)
router.get("/register",auth, registeredCourse)
router.put("/update", auth, updateUserProfile)
router.get("/courses", auth, getAllCourses)
router.get("/services", auth, getAllServices)
module.exports= router;