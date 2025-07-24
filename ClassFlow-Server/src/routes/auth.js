const express = require('express');
const authRoute = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const { validateSignupData } = require('../utils/validators');

authRoute.post('/sign-up',async (req,res)=>{

    try{

        validateSignupData(req);

        const { firstname, lastname, emailId, password} = req.body;

        const reqUser = await User.findOne({emailId : emailId});

        if(reqUser){
            throw new Error("User already exist, try Login!");
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = new User({
            firstname,
            lastname,
            emailId,
            password : hashPassword,
        });
        
        const savedUser = await user.save();

        // Get JWT token using user helper function
        const token = await savedUser.getJWT();

        // Add tocken to cookies
          
        res.cookie("token", token, {
            httpOnly: true,   
            secure: true,     
            sameSite: "None", 
            expires: new Date(Date.now() + 30 * 24 * 3600000), 
        });
         

        res.json({ message: `${savedUser.firstname} has been registered`, data: savedUser });
    }catch(err){
        res.status(400).send(err.message);
    }

});


authRoute.post('/login', async (req,res)=>{

    try{

        const { emailId, password } = req.body;

        const user = await User.findOne({emailId : emailId});

        if(!user){
            throw new Error("Invalid Credentials");
        }

        // Validate password using user helper function
        const isPasswordValid = await user.validatePassword(password);

        if(!isPasswordValid){
            throw new Error("Wrong Password")
        }

        const token = await user.getJWT();

        // Add tocken to cookies
        res.cookie("token", token, {
            httpOnly: true,   
            secure: true,     
            sameSite: "None", 
            expires: new Date(Date.now() + 30 * 24 * 3600000), 
        });
        
        res.json({ message: "Login!", data: user });
    }catch(err){
        res.status(400).send(err.message);
    }

});


authRoute.post('/logout', async (req,res)=>{
    try{

        res.cookie("token", null , {
            httpOnly: true,   
            secure: true,     
            sameSite: "None", 
            expires: new Date(Date.now()), 
        });

        res.json({ message: "Logout!"});
    }catch(err){
        res.status(400).send(err.message);
    }
});


module.exports = { authRoute };