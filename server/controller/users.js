const UserModel = require("../models/users.js");
const bcrypt = require("bcryptjs");
// const jwtSecret = "sdfsdfjsdjfsdjfjs";
// const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);

const userctl = {
  userHandler: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if the email is already taken
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        const error = new Error("Email is already taken");
        error.status = 409; // Set the status code to 409 (Conflict)
        throw error;
      }

      const newUser = new UserModel({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error creating user:", error);
      if (!error.status) {
        error.status = 500; // Set the default status code to 500 (Internal Server Error)
      }
      res.status(error.status).json(error.message);
    }
  },
  // userDetails: async (req, res) => {
  //   try {
  //     const token = req.headers.authorization;
  //     const data = jwt.verify(token, jwtSecret);
  //     const id = data.id;
  //     const userData = await UserModel.findById(id).select("-password");
  //     res.json(userData).status(200);
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },
};

module.exports = userctl;
