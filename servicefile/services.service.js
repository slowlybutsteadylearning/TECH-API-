const pool = require("../config/db");

const techServices = {

    uploadServices: async(serviceName, serviceDescription) =>{
        const res1 = await pool.query("INSERT INTO services (serviceName, serviceDescription) VALUES (?, ?)",
        [serviceName, serviceDescription]
        );
        const result = res1[0];
        return result;
      },
      findServiceById: async (id) => {
        const result = await pool.query("SELECT * FROM services WHERE id = ?", [id]);
        return result[0]; // [{}]
      },
      findByServiceName: async (serviceName) => {
        const res = await pool.query("SELECT * FROM services WHERE serviceName = ?", [
          serviceName,
        ]);
        const res1 = res[0];
        const result = res1[0]; // const result = res[0][0];
        // console.log(result);
        return result;
      },
      findAllServices: async () => {
        const result = await pool.query("SELECT * FROM services");
        return result[0]; // [{}]
      },  
}

module.exports= techServices