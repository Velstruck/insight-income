const User = require('../models/User');
const jwt = require('jsonwebtoken');


// generate token kro
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1h'});
}

// register kro user ko
exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    //validation krenge ab
    if(!fullName || !email || !password) {
        return res.status(400).json({message: 'Please enter all fields'});
    }

    try {
        //email checking if already there or nott
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'Email already in use! Sad'});
        }

        //now creating user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (err) {
        res.
        status(500)
        .json({message: 'Server Error!', error: err.message});
    }
}

// login kro user ko
exports.loginUser = async (req, res) => {}

// get kro user ko
exports.getUserInfo = async (req, res) => {}
