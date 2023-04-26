const pool = require("../config/db");

const registrationService = {
    courseRegistration: async(user_id, course_id, amount,) =>{
        const result = await pool.query("INSERT INTO registrations (user_id, course_id, amount) VALUES (?, ?, ?)",
         [user_id, course_id, amount]
        );
        return result[0] 
        },

    findRegisteredUserById: async (id) => {
        const result = await pool.query("SELECT * FROM registrations WHERE id = ?", [id]);
        return result[0];  // [{}]
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

    //  payment: async(user_id, course_id, amount,) =>{
    //     const result = await pool.query("INSERT INTO registrations (user_id, course_id, amount) VALUES (?, ?, ?)", [
    //         user_id, course_id, amount]
    //     );
    //     return result[0] 
    //     },

     isApproved: async(id) =>{
        const [rows] = await pool.query('UPDATE students SET approved = TRUE WHERE id = ?', [id]);
    
        return result[0] 
        },

    
}

module.exports = registrationService;