import jwt from "jsonwebtoken"
const asyncHandler = async(req, res, next)=>{
    const token = req.header('Authorization')?.split(' ')[1];
    const verifytoken = jwt.verify(token, process.env.secretKey)

    if(verifytoken.role === "admin"){
        next()
    } 
    else if(!verifytoken){
        res.status(401).json({ message: 'Invalid token' }) 
    }
    else {
        res.status(401).json({ message: 'Not a authorized user' })    
    }
    
}

export default asyncHandler;