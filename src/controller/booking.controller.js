// const wrap = require("../helper/wrapper");
// const { spaceBookings } = require("../servicefile/booking.service");
// const { findUserById } = require("../servicefile/user.service");

// exports.bookedHubSpace = wrap(async(req, res) =>{
//   const user_id = req.user.id;  
//   const {start_time, end_time, date} = req.body;
  
//   // const userId = req.user.id;
//   // const { start_time, endTime, date } = req.body;
//     // const course = await courseService.findCourseById(course_id);
    
//     // const user = await findUserById(user_id);
//     // if (!user[0]) {
//     //   return res.status(404).json({message: "User not found"})
//     // }
//     const bookings = await spaceBookings( start_time, end_time, date, user_id)
//     return res.status(201).json({message: "Successfully booked a space in the Hub"})

//     // const bookingId = await bookingsService.bookSpace(userId, startTime, endTime, date);
//     // res.status(201).json({ id: bookingId });
//   })


const bookingsService = require('../servicefile/booking.service');

// Book a space in the hub
async function bookSpace(req, res, next) {
  const user_id = req.user.id;
  const { start_time, end_time, date } = req.body;
  try {
    const bookingId = await bookingsService.bookSpace(user_id, start_time, end_time, date);
    res.status(201).json({ message: "Successfully booked a space in the Hub" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  bookSpace,
};
