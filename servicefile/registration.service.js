const pool = require("../config/db");

const registrationService = {
    courseRegistration: async(user_id, course_id) =>{
       const result = await pool.query("INSERT INTO registrations (user_id, course_id) VALUES (?, ?)", [
        user_id, course_id]
    );
    return result[0] 
    },
    findAllRegistration:async(course_id) =>{
        const result = await pool.query("SELECT * FROM registrations"
     );
     return result[0] 
     },
    totalRegistration:async(course_id) =>{
        const result = await pool.query('SELECT COUNT(*) AS count FROM registrations')
     return result[0] 
     },
}

module.exports = registrationService;