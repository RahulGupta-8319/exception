const express = require("express");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const route = require("./routes/route.js");
const cors = require('cors')

app.use(express.json());
app.use(multer().any());
app.use(cors())

mongoose.connect("mongodb+srv://rahul:rahul123@cluster0.ghayzlv.mongodb.net/5-exception",{
      useNewUrlParser: true,
    })
  .then(() => console.log("mongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.all("*", (req, res) => {
  res.status(404).send({ status: false, message: "path not found...!!" });
});

app.listen(3001, () => { console.log("server is running on 3001") });
