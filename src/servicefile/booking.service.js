const pool = require("../config/db");

// const bookingService = {
//     spaceBookings: async(user_id, start_time, end_time, date) =>{
//        const result = await pool.query("INSERT INTO bookings (user_id, start_time, end_time, date) VALUES (?, ?, ?, ?)", 
//        [user_id, start_time, end_time, date]
//     );
//     return result[0] 
//     },
//     // findAllRegistration:async(course_id) =>{
//     //     const result = await pool.query("SELECT * FROM bookings"
//     //  );
//     //  return result[0] 
//     //  },
//     // totalRegistration:async(course_id) =>{
//     //     const result = await pool.query('SELECT COUNT(*) AS count FROM bookings')
//     //  return result[0] 
//     //  },
// }


// Book a space in the hub
async function bookSpace(user_id, start_time, end_time, date) {
  try {
    const booking = await pool.query(
      'INSERT INTO bookings (user_id, start_time, end_time, date) VALUES (?, ?, ?, ?)',
      [user_id, start_time, end_time, date]
    );
    return booking[0];
  } catch (error) {
    throw new Error(`Could not book space: ${error.message}`);
  }
}

module.exports = {
  bookSpace,
};



// module.exports = bookingService