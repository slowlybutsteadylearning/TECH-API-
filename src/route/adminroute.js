const router =require("express").Router();

const { createANewAdmin, adminLogin, createANewCourse, uploadNewService } = require("../controller/admin.controller");
const { getAllRegistered, getTotalRegistration, userApproved, totalAmount } = require("../controller/registration.controller");
const auth = require("../middleware/auth");
const roleBasedAccess = require("../middleware/rbca");
const { validateRequest, schemas } = require("../utils/validator");


router.post("/signup", createANewAdmin);
router.post("/login", validateRequest(schemas.loginSchema), adminLogin);
// router.put("/update", auth, updateUserProfile)
router.post("/course",auth, roleBasedAccess(["admin"]),validateRequest(schemas.courseSchema), createANewCourse)
router.post("/upload",auth, roleBasedAccess(["admin"]), uploadNewService)
router.get("/registrations",auth, roleBasedAccess(["admin"]), getAllRegistered)
router.get("/totalcount",auth, roleBasedAccess(["admin"]), getTotalRegistration)
router.put("/users/:id",auth, roleBasedAccess(["admin"]), userApproved)
router.get("/sum",auth, roleBasedAccess(["admin"]),totalAmount)
module.exports= router;