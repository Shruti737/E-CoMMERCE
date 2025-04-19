import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required : true,
            min: 3
        },
        description:{
            type:String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        image:{
            type: Array,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        subCategory:{
            type:String,
            required: true
        },
        sizes:{
            type: Array,
            required: true
        },
        bestseller:{
            type: Boolean
        },
        date:{
            type:Number,
            required: true
        },
        stock:{
            type:Number,
            required: true
        }
    }
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default  Product

// In a big application, you often split your models, controllers, routes, etc.,
//  into separate files. If you import your model file (Product.js) into multiple 
//  places, and each of those files calls mongoose.model("Product", productSchema),
//   Mongoose will think you are trying to create a new model each time.
//Instead of calling mongoose.model("Product", productSchema) directly,
// check if the model already exists using:  mongoose.models.Product