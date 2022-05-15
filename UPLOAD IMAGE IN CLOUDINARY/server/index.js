const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

dotenv.config();

// databse connection
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>console.log("database is connected succesfully"))
.catch((err) => console.log(err));

// middleware
app.use(express.json());

// route
app.use("/image-upload",require("./routes/index"))
app.listen(process.env.PORT,() => {
    console.log("server is running");
})