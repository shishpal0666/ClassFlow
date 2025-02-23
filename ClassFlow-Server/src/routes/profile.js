const express = require('express');
const User = require('../models/user');
const profileRoute = express.Router();
const { userAuth } = require('../middleware/userAuth');
const { validateEditUser } = require('../utils/validators');



profileRoute.get('/profile/view', userAuth, async (req, res) => {
    try {

        // Get user from DB
        const user = await User.findById({ _id: req.user._id });


        res.json({ message: `${user.firstname} Profile`, data: user });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});


profileRoute.patch('/profile/edit', userAuth, async (req, res) => {
    try {

        if (!validateEditUser(req)) {
            throw new Error("Invalid edit request");
        }

        // req.user is set by userAuth middleware
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        const updatedUser = await loggedInUser.save();

        res.json({
            message: `${updatedUser.firstname}, your profile updated successfuly`,
            data: updatedUser,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});


module.exports = { profileRoute };