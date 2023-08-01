const express = require("express");
const route = require("./routes/route.js");
const Connection = require("./database/db.js");
const app = express();
require("dotenv").config();
var cors = require("cors");
const PORT = 3000;
const path = require("path");
app.use(express.json());
app.use( express.static('uploads/'));
app.use(cors());
Connection();

app.use("/", route);

app.listen(PORT, () => {
  console.log(`server start --port ${PORT} `);
});
