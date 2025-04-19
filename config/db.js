import mongoose from "mongoose"

const dbConnect = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ Database Connected Successfully");
    } catch (err) {
      console.log("❌ Database Connection Failed: " + err.message);
      process.exit(1); // Exit the process with failure
    }
  };
  
 export default dbConnect;

 