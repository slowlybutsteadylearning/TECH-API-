require("dotenv").config();
const express =require("express");
require("colors")


const app = express();
const logger = require("./log/logger");
const {pool} = require("./config/db");
const router = require("./route/user.route");

const adminRoute = require("./route/adminroute");

// pool();

const port = process.env.PORT || 8000;

// middleware
app.use(express.json({ limit: "10kb" }));

// app.use((req, res, next) => {
//     logger.info(`${req.method} ${req.originalUrl}`);
//     next();
//   });

app.get("/", (req,res)=>{
    res.send("<h1>Welcome</h1>")
});

app.use(router)
app.use("/api", adminRoute)

app.listen(port, () =>{
    logger.info("Server is up and running".yellow)
})