const wrap = require("../helper/wrapper");
const courseService = require("../servicefile/course.service");
const { courseRegistration, findAllRegistration, totalRegistration } = require("../servicefile/registration.service");
const { findUserById } = require("../servicefile/user.service");


exports.registeredCourse = wrap(async(req, res) =>{
    const {course_id} = req.body;
    const user_id = req.user.id;
    const course = await courseService.findCourseById(course_id);
    if (!course[0]) {
      return res.status(404).json({ message: "Course not found" });
    };
    const user = await findUserById(user_id);
    if (!user[0]) {
      return res.status(404).json({message: "User not found"})
    }
    const registration = await courseRegistration( course_id, user_id )
    return res.status(201).json({message: "Course successfully registered"}, )
  })

  exports.getAllRegistered = wrap(async(req, res) =>{
    const registrations = await findAllRegistration();
    return res.status(200).json(registrations)
  })
  exports.getTotalRegistration = wrap(async(req, res) =>{
    const totalCount = await totalRegistration();
    return res.status(200).json(totalCount)
  })

