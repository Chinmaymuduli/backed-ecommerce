const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for image
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

cloudinary.config({
  cloud_name: "dk3stwbo1",
  api_key: "195442494843476",
  api_secret: "5McgGiTzpbOON9NPbyXWPIQ5zG4",
});

// Authentication
const Auth = (req, res, next) => {
  const token = req.get("Authorization")?.split("Bearer ")[1];
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRETE);
    if (decoded.email) {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({
        message: "token is required",
        status: 401,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "token is required",
      status: 401,
    });
  }
};

mongoose.connect(process.env.MONGOOSE_URI).then(() => {
  console.log("db connected");
});

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/user", Auth, require("./routes/user"));
app.use("/delete", Auth, require("./routes/deleteUser"));
app.use("/products", Auth, require("./routes/products"));
app.use("/cart", Auth, require("./routes/cart"));

app.listen(3000, () => {
  console.log(`app running at 3000`);
});
