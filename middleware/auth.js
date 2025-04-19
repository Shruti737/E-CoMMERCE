import jwt from "jsonwebtoken"
const auth = (req, res, next) => {
     const token = req.header('Authorization')?.split(' ')[1];
     if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
     console.log(req.headers['authorization']);

     try {
         const decode = jwt.verify(token, process.env.secretKey);

         req.user = decode;

         next();
     } catch (error) {
         res.status(400).json({ error: 'Invalid Token' });
     }
     console.log("Auth Header:", req.headers['authorization']);

};

export default auth