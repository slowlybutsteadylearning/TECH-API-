const pool = require("../config/db");

const wrap = require("../helper/wrapper");
const courseService = require("../servicefile/course.service");
const { courseRegistration, findRegisteredUserById , findAllRegistration, totalRegistration } = require("../servicefile/registration.service");
const { findUserById } = require("../servicefile/user.service");


exports.registeredCourse = wrap(async(req, res) =>{
  const {course_id, amount} = req.body;
  const user_id = req.user.id;
  const course = await courseService.findCourseById(course_id);
  if (!course[0]) {
    return res.status(404).json({ message: "Course not found" });
  };
  const user = await findUserById(user_id);
  if (!user[0]) {
    return res.status(404).json({message: "User not found"})
  }
  const pay = await courseRegistration( course_id, amount, user_id )
  // const userRegistered = await findRegisteredUserById(pay.insertId);
  return res.status(201).json({message: "Course successfully registered"} )
})

  exports.getAllRegistered = wrap(async(req, res) =>{
    const registrations = await findAllRegistration();
    return res.status(200).json(registrations)
  })
  exports.getTotalRegistration = wrap(async(req, res) =>{
    const totalCount = await totalRegistration();
    return res.status(200).json(totalCount)
  })

exports.userApproved = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('UPDATE registrations SET approved = TRUE WHERE id = ?', [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User approved successfully' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.totalAmount = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT SUM(amount) AS total_amount FROM registrations WHERE approved = 1');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};