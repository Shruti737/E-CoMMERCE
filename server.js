
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from './routes/userRoutes.js'
import productrouter from './routes/products.js'
import cartRouter from './routes/cartRoutes.js'
dotenv.config();
import dbConnect from './config/db.js'
import cloudinaryConnect from "./config/cloudinary.js";
const app = express();
const port = process.env.PORT||4000;
import  swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger-output.json' assert { type: 'json' };
dbConnect();
cloudinaryConnect()

const options = {
    swaggerOptions: {
      authAction: {
        bearerAuth: {
          name: "bearerAuth",
          schema: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Enter JWT token as: Bearer <your_token>"
          },
          value: "Bearer <JWT>" // replace <JWT> manually in Swagger UI
        }
      }
    }
  };
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/api/user', router);
app.use('/api/product', productrouter)
app.use('/api/cart',cartRouter )
//API endpoints
app.get('/',(req, res)=>{
    res.send("API WORKING")
})

app.listen(port, ()=>{
   
    try {
        console.log(`Server started in the port ${process.env.PORT}`);
       
    } catch (error) {
        console.log(`Error`, error);
       
    }
   
})