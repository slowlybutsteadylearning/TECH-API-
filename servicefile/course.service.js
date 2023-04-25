const pool = require("../config/db")

const courseService ={
    createCourse: async(
        course_name,
        price
        
    ) =>{
        const [rows] = await pool.query(
            "INSERT INTO courses (course_name, price) VALUES (?, ?)",
            [course_name, price]
        );
        return rows;
    },
    findCourseById: async (id) => {
        const result = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
        return result[0];
    },
    findByCourseName: async (course_name) => {
   
        const res = await pool.query("SELECT * FROM courses WHERE course_name = ?", [
          course_name,
        ]);
        const res1 = res[0];
        const result = res1[0]; // const result = res[0][0];
        console.log(result);
        return result;
    },
    findAllCourses: async (id) => {
        const result = await pool.query("SELECT * FROM courses");
        return result[0];
    },
}

module.exports = courseService;