import User from "../Model/userModel.js";


export const register =async(req,res)=>{
    try{
   const {email,password,phone}=req.body;
   if(!email){
return res.send({message:"Email is required"})
   }
   if(!password){
return res.send({message:"Email is required"})
   }
   if(!phone){
return res.send({message:"Email is required"})
   }


   ///check user
   const existinguser=await user.findone({email})
   if(existinguser){
    return res.status(200).send({
        sucess:true,
        message:"already register plese login"
    })
   }
    }
    catch(error){
        console.log("error")
    }
}


//post login
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

    res.status(200).send({
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

