import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
 {
    FirstName :{
        type: String,
        required : true,
        min : 2,
        max : 50,
    },
    LastName :{
        type: String,
        required : true,
        min : 2,
        max : 50,
    },
    email :{
        type: String,
        required : true,
        max : 100,
        unique : true,
    },
    password :{
        type: String,
        required : true,
        min : 5,
    },
    PicturePath :{
        type: String,
        default : "",
    },
    firends: {
        type: Array,
        deafult : [],
    },

    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
 },
 {timestamps: true } 
 ); 

 const User = mongoose.model("User",UserSchema);
 export default User;