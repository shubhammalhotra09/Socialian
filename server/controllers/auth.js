import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
     const {
        FristName,
        LastName,
        Email,
        Password,
        PicturePath,
        friends,
        locations,
        occuptaions,
     } = req.body;

     const salt = await bcrypt.genSalt();
     const passwordhash = await bcrypt.hash(Password, salt);
     const newUser = new User({
        FristName,
        LastName,
        Email,
        Password : passwordhash,
        PicturePath,
        friends,
        locations,
        occuptaions,
        viewedProfile : Math.floor(Math.random () * 10000),
        impressions : Math.floor(Math.random () * 10000),
     });
     const savedUser = await newUser.save();
     res.status(201).json(savedUser);

    } catch (err){
        res.status(500).json ({error: err.message});
    }

};

/* Logging In */

export const login = async (req, res) => {
    try{
        const { Email, Password } = req.body;
        const user = await User.findOne({email : email });
        if (!user) return res.status(400).json({ msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMAtch) return res.status(400).json({ msg: "Invalid Username Or Password. "});

        const token = jwt.sign({id :user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user});

    } catch (err){
        res.status(500).json ({error: err.message}); 
    }
}
