import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: { type: String, enum: ['admin', 'user'], default: 'user' },

        cartData: {type: Object, default: {}}
    }, {minimize: false}  
    //store the empty object in the database else it will be not stored the null value --default
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User


