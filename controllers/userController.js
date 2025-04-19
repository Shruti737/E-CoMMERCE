import User from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const Createtoken = (id) =>{ return jwt.sign({id}, process.env.secretKey, { expiresIn: '1h' });}

const loginUser = async(req, res)=>{
    
    //take input
    const {email, password} = req.body
    //validation check 
    if(!email || !password){
        res.status(404).json({message: "All Fields are required"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({sucess: false, message: "Must be Valid email Used"})
    }
    //Check User Existence & Password Matching
    const userExist = await User.findOne({email});
   
    if(!userExist){
        res.status(401).json({message: "User not Found"})
    }
 
  const passMatch =  await bcrypt.compare(password,userExist.password );  
    //generate jwt and refreshtoken
   if (passMatch) {
     const token = Createtoken({ email: userExist.email, userId: userExist._id, role: userExist.role });
      res.status(200).json({message: "User Logged In Successfully", token: token});
}
   else{
     res.status(400).json({message: "Invalid Credentials"})
   }
}

const registerUser = async(req, res)=>{
    try {
        //input taken 
        const {name, email, password} = req.body;
        //validation check
        if([name, email, password].some(field => !field)){
         res.status(404).json("All Fields are required")
        }
    
        if(!validator.isEmail(email)){
            return res.status(400).json({sucess: false, message: "Must be Valid email Used"})
        }
        if(password.length < 8){
            return res.status(400).json({sucess: false, message: "Please enter a String password"})
        }
        //check the existing user
        const existingUser = await User.findOne({email})
        if(existingUser){
           return res.status(400).json({message : "user already exist"})
        }
        //password bcrypt
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
       // save db 
        const user = await User.create({
            name,
            email,
            password: hashedPassword
           })
           
        const createdUser = await User.findById(user._id).select("-password")   
        
        //check for user creation
      if(!createdUser){
        res.status(500).json({message:"Something went wrong while registering the user"})
       }
       //return res
       const token = Createtoken({ email: user.email, userId: user._id, role: user.role });

       return res.status(201).json(
       {message: "User Registerd Succesfully", user : createdUser, token: token},
       )  
    } catch (error) {
        res.status(400).json({message: "Error Occured"})
        console.log("error" + error);   
    }
}

const adminLogin = async(req, res)=>{
 try {
    const {email, password} = req.body;   
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = Createtoken(role);
        res.json({sucess: true, token})
    }else{
        res.json({sucess: false, message: "Invalid Credentials"})
    }
 } catch (error) {
    res.json({sucess: false, message: error.message })
 }
}

const changeRole = async(req, res)=>{
   try {
    
     const id = req.params.id; 
     if(!id){
        res.status(404).json({message: "Bad Request Error"})
     }
     
     const data = await User.findByIdAndUpdate(id,
         {$set:{role: "admin"}}
     )
 
     res.status(200).json({message: "user update successfully", data: data})
   } catch (error) {
    res.status(500).json({message: "Internal server Error", error: error})
   }
}

export {loginUser, registerUser, adminLogin, changeRole}


//id = 284338225992-8qhpcd4iu524tc84rnknk1sphdmoqt8b.apps.googleusercontent.com
//secret = GOCSPX-7Y2WMr2p4C4vwFfl_O9Ab-qcmQ