import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// * We need to coordinate the request to the Database in order to create the users

const User = require("../models/sleepModels.js");
const secretPass = 'test';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.query({ username });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, secretPass, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const register = async (req, res) => {
  const { username, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.query({ username });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ username, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { username: result.username, id: result._id }, secretPass, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};