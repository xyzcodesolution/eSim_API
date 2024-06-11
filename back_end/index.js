const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const AppRouter = require("./router");
const bodyParser = require("body-parser");
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/eSim");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api", AppRouter);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, () => console.log(`App listening port ${PORT}`));


