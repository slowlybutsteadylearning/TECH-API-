const pool = require("../config/db");
const bcrypt = require("bcrypt");

const userService = {
  createUser: async (firstName, lastName, email, password) => {
    // const [result] = await pool.query(
    //   "INSERT INTO users (email, password) VALUES (?, ?) ",
    //   [email, hashedPassword]
    // );

    // return result; // 1

    const res = await pool.query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?) ",
      [firstName, lastName, email, password]
    );
    const result = res[0];
    return result; // 1
  },
  findUserById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return result[0]; // [{}]
  },
  findByEmail: async (email) => {
    // const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
    //   email,
    // ]);
    // console.log(result);
    // return result[0]
    const res = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const res1 = res[0];
    const result = res1[0]; // const result = res[0][0];
    console.log(result);
    return result;
  },
  // updateUser: async (firstName, lastName, email, course_id) => {
  //   const result = await pool.query('UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?', 
  //   [firstName, lastName, email, id]);
  //   if (course_id) {
  //   await pool.query('UPDATE registrations SET course_id = ? WHERE user_id = ?', [course_id]);
  //   }
  //   return result[0];
  // },

  
}
module.exports = userService;