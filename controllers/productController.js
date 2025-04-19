import  Product from '../models/productModel.js'
import { v2 as cloudinary } from 'cloudinary';
import { isValidObjectId, Types,mongoose } from "mongoose";

const addProduct = async(req, res) =>{
  try {
      const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
      const image1 = req.files?.image1?.[0];
      const image2 = req.files?.image2?.[0];
      const image3 = req.files?.image3?.[0];
      const image4 = req.files?.image4?.[0];
    
      const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)
      const imagesUrl = await Promise.all(
            images.map(async (item)=>{
              let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image',})
              console.log(item.path);
              return result.secure_url
            })
      )
      const productData =   {
        name, 
        description,
        price,
        category,
        subCategory,
        sizes: JSON.parse(sizes),
        bestseller: bestseller === 'true' ? true : false,
        image: imagesUrl,
        date: Date.now()
      }
      const Newproduct = new Product(productData)
      await Newproduct.save();      
      res.json({success: true, message: "Product Added"})
      
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

const listProduct = async(req, res) =>{
try {
   
  const product = await Product.find();
  const filtered = product.map((product)=>({
    id: product._id,
    product_name: product.name
}))
  return res.status(200).json(filtered)
  
 
} catch (error) {
  res.json({success: false, message: error.message})
}
}

const removeProduct = async(req, res) =>{
   try {
      const id = req.params.id;
      if (!id || !isValidObjectId(id)) {
        res.status(400)
        throw new Error("Please provide a valid id")
    }
    if( !mongoose.Types.ObjectId.isValid(id) ) return false;
    const deleteProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({sucess: true, message: "Product deleted succesfully"})
   } catch (error) {
    res.json({success: false, message: error.message})
   }
}

const singleProduct = async(req, res) =>{
   try {
    const id = req.params.id;
     console.log(id);
     if(!id){
       res.status(404).json({message: "Bad Request"})
       
     }
    const data = await Product.findOne({_id: id})
    res.status(200).json({message: "Data Rtrieved successfully", data: data})
   } catch (error) {
    res.json({success: false, message: error.message})
   }
}

export  {addProduct, listProduct, removeProduct, singleProduct}