
import express from "express"
import cors from "cors"
import path from 'path'
import { fileURLToPath } from 'url';

import dotenv from "dotenv"
dotenv.config();
import router from './routes/userRoutes.js'
import productrouter from './routes/products.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
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
// Path to the current directory (for serving static files)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files
app.use(express.static(__dirname));

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Adjust path if needed
});


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/api/user', router);
app.use('/api/product', productrouter)
app.use('/api/cart',cartRouter )
app.use('/api/order', orderRouter)
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