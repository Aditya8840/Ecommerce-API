const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 8080;
const userRoute = require("./routers/user")
const authRoute = require("./routers/auth")
const addressRoute = require("./routers/address")
const adminRoute = require("./routers/admin")
const documentRoute = require("./routers/document")


dotenv.config();

app.use(express.json())
require('./db/mongoose')

// Profile Related
app.use("/api/user", userRoute);

// Authentication Related
app.use("/api/auth", authRoute);

// Address Related
app.use("/api/address", addressRoute);

// Admin related
app.use("/api/admin", adminRoute)

//Document Related
app.use("/api/document", documentRoute)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });