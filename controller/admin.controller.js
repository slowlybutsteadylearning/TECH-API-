const { hashedPassword, comparePassword } = require("../helper/comparedp");
const { generateToken, setTokenCookie } = require("../helper/jwt");
const wrap = require("../helper/wrapper");
const { createAdmin, findByEmail, findAdminById } = require("../servicefile/admin.service");
const { createCourse, findByCourseName, findCourseById } = require("../servicefile/course.service");
const { totalRegistration } = require("../servicefile/registration.service");
const { uploadServices, findByServiceName, findServiceById } = require("../servicefile/services.service");


exports.createANewAdmin = wrap(async (req, res) => {
    let { email, password } = req.body;
    const foundAdmin = await findByEmail(email);
    if (foundAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    password = await hashedPassword(password);
    const newAdmin = await createAdmin(email, password); // 1
    const createdAdmin = await findAdminById(newAdmin.insertId);
    return res.status(201).json({ message: "Admin created successfully",createdAdmin });
  });

  exports.adminLogin = wrap(async (req, res) => {
    const { email, password } = req.body;
    const admin = await findByEmail(email);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    const token = await generateToken({
      id: admin.id,
      roles:admin.roles,
      email: admin.email,
      firstName: admin.firstName,
    });
    setTokenCookie(res, token);
    return res.status(200).json({ id: admin.id, admin: admin.email, token: token });
  });

  exports.uploadNewService = wrap(async (req, res) => {
    let { serviceName, serviceDescription } = req.body;
    const foundService = await findByServiceName(serviceName);
    if (foundService) {
      return res.status(409).json({ message: "Service already exists" });
    }
    const newService = await uploadServices(serviceName, serviceDescription); // 1
    const createdService = await findServiceById(newService.insertId);
    return res.status(201).json({ message: "Service uploaded successfully", createdService});
  });

  exports.createANewCourse = wrap(async (req, res) => {
    let { course_name, price } = req.body;
    const foundCourse = await findByCourseName(course_name);
    if (foundCourse) {
      return res.status(409).json({ message: "Course already exists" });
    }
    const newCourse = await createCourse(course_name, price); // 1
    const createdCourse = await findCourseById(newCourse.insertId);
    return res.status(201).json({ message: "Course successfully added",createdCourse });
  });