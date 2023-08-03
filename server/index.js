const express = require("express");
const morgon=require("morgan")
const route = require("./routes/route.js");
const Connection = require("./database/db.js");
const app = express();
require("dotenv").config();
var cors = require("cors");
const PORT = 8080;
const path = require("path");
app.use(express.json());
app.use( express.static('uploads/'));
app.use(cors());
app.use(morgon('dev'))
Connection();
console.log("runn")
app.use("/", route);

app.listen(PORT, () => {
  console.log(`server start --port ${PORT} `);
});

