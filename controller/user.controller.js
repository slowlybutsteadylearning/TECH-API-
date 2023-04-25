const pool = require("../config/db");

const {createUser, findByEmail, findUserById, updateUser} = require("../servicefile/user.service")
const wrap = require("../helper/wrapper");
const { generateToken, setTokenCookie } = require("../helper/jwt");
const { hashedPassword, comparePassword } = require("../helper/comparedp");
const { findAllCourses } = require("../servicefile/course.service");
const { findAllServices } = require("../servicefile/services.service");
// const { courseRegistration } = require("../servicefile/registration.service");


exports.createANewUser = wrap(async (req, res) => {
    let { firstName, lastName, email, password } = req.body;
    const foundUser = await findByEmail(email);
    if (foundUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    password = await hashedPassword(password);
    const newUser = await createUser(firstName, lastName, email, password); // 1
    const createdUser = await findUserById(newUser.insertId);
    return res.status(201).json({ message: "User created successfully",createdUser });
  });

  exports.userLogin = wrap(async (req, res) => {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    const token = await generateToken({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    });
    setTokenCookie(res, token);
    return res.status(200).json({ id: user.id, user: user.email, token: token });
  });

exports.getAllCourses = wrap(async(req, res) =>{
  const courses = await findAllCourses();
  return res.status(200).json(courses)
})

exports.getAllServices = wrap(async(req, res) =>{
  const services = await findAllServices();
  return res.status(200).json(services)
})


exports.registeredCourse = wrap(async(req, res) =>{
  const {course_id} = req.body
  const user_id = req.user.id;
  const registration = await courseRegistration(course_id, user_id)
  return res.status(200).json(registration)
})

  exports.updateUserProfile = wrap(async (req, res) => {
    const { firstName, lastName, email, course_id } = req.body;
    // const hashedPassword = await hashedPassword(password);
    
    const result = await pool.query('UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?',
    [firstName, lastName, email, req.params.id]);
  
  // Update course registration if provided
  if (course_id) {
    // Check if course exists
    const course = await pool.query('SELECT id FROM courses WHERE id = ?', [course_id]);
    if (!course || !course[0]) return res.status(404).json(`Course with ID ${course_id} does not exist`); 
    
    // Update registration
    await pool.query('UPDATE registrations SET course_id = ? WHERE user_id = ?', [course_id, req.user.id]);
  }
    return res.status(200).json({message:"Profile Successfully updated"});
  });