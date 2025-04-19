import { v2 as cloudinary } from 'cloudinary'

const cloudinaryConnect = async()=>{
    try {
        cloudinary.config({ 
            cloud_name: process.env.Cloud_Name, 
            api_key: process.env.Cloud_ApiKey, 
            api_secret: process.env.Cloud_ApiSecret
          });
          console.log("✅ Cloudinary Connected Successfully");
    } catch (error) {
        console.log("❌ Cloudinary Connection Failed: " + err.message);
    }
}

export default cloudinaryConnect;