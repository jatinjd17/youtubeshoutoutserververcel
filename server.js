const express = require("express");
const axios = require("axios");
const addrouter = require("./routes/add.js");
// const userrouter = require("./getjson");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const channel = "./channel.json";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/chan", (req, res) => {
  //   res.append("Access-Control-Allow-Origin", ["*"]);
  //   res.set("Content-Type", "application/json");
  res.json(fs.readFileSync(channel, "utf-8"));
});
// app.options("*", cors());
// var cors = new EnableCorsAttribute("*", "*", "*");
// config.EnableCors(cors);

app.use("/", addrouter);
// app.use("/user", userrouter);

// mongoose
//   .connect(
//     "mongodb+srv://abc:abc@cluster0.dxpx8.mongodb.net/abc?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => {
//     console.log("Db is Connected");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is connected to PORT 3000");
});
