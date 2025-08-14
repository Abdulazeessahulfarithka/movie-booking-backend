
import User from "../Model/userModel.js";
import JWT from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
  try {
    const {name, email, password, phone } = req.body;

    // Validation
   if(!name){
        return res.status(400).send({ success: false, message: "Name is required" });

}
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
    const user = new User({ name,email, password, phone });
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

  const match= await comparepassword(password,user.password)
  if(!match){
    return res.status(200).send({
      success:false,
      message:"invalid password",
    })
  }
  
     const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    }); 
     res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    })

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong during login",
    });
  }
};
