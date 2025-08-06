import User from "../Model/userModel.js";

// Register Controller
export const register = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    // Validation
    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ success: false, message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ success: false, message: "Phone is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Create new user
    const user = new User({ email, password, phone });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong during registration",
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Password check placeholder (bcrypt recommended)
    // if (password !== user.password) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "Invalid password",
    //   });
    // }

    return res.status(200).send({
      success: true,
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong during login",
    });
  }
};
