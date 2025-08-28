import User from "../Model/userModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ success: false, message: "Already registered, please login" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send({ success: false, message: "Registration failed" });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "Email is not registered" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ success: false, message: "Invalid password" });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ success: false, message: "Login failed" });
  }
};
