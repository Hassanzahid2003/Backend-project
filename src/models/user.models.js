import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from'jsonwebtoken'
const Userschema = new Schema({
    user:{
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        index:true,
        unique:true
    },
    email:{
        required: true,
        trim:true,
        lowercase:true,
        unique:true,
        type: String,
    },
    fullname:{
        type: String,
        required: true,
        trim:true,
    },
    avatar:{
        type: String, //cloudinary url
        required:true
    },
    coverimage:{
        type: String, //cloudinary url
        required:true
    },
    watchHistory:{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    }
},
{timestamps:true}
)

Userschema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()

    //2nd method
    // if(this.isModified("password")){
    // this.password = bcrypt.hash(this.password, 10)
    // next()}
})

Userschema.methods.IspasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}
 
Userschema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
        id : this._id,
        username:this.username,
        email:this.email,
        fullname: this.fullname
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}


Userschema.methods.generateRefreshToken = function(){

    return jwt.sign({
        id : this._id,
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
})
}
export const User = mongoose.model("User", Userschema)