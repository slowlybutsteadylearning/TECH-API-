const pool = require("../config/db");
const bcrypt = require("bcrypt");

const adminService = {
  createAdmin: async (email, password) => {
    const res = await pool.query(
      "INSERT INTO admins (email, password) VALUES (?, ?) ",
      [email, password]
    );
    const result = res[0];
    return result; // 1
  },
  findAdminById: async (id) => {
    const result = await pool.query("SELECT * FROM admins WHERE id = ?", [id]);
    return result[0]; // [{}]
  },
  findByEmail: async (email) => {
    const res = await pool.query("SELECT * FROM admins WHERE email = ?", [
      email,
    ]);
    const res1 = res[0];
    const result = res1[0]; // const result = res[0][0];
    console.log(result);
    return result;
  },
  
}
module.exports = adminService;