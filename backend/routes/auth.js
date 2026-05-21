const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// registering routes
router.post("/register", async (req, res) => {
    try{

        //everything user needs to enter on initial sign up, tokenpattern is creative auth method
        const {username, email, tokenPattern} = req.body;

        //the pattern made from the tokens has to be atleast 6 tokens long otherwise an error pops up.
        //tokens can also be repeated, and max length is 12 - this allows for a lot of combinations
        if (!tokenPattern || tokenPattern.length < 6) {
            return res.status(400).json({message: "your pattern should be atleast 6 tokens long"});
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({message: "user already exists, please log in"});
        }

        const tokenString = tokenPattern.join('-');

        const salt = await bcrypt.genSalt(10);

        const hashedPattern = await bcrypt.hash(tokenString, salt);

        const newUser = new User({ username, email, password:hashedPattern});
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" } 
        );

       res.status(201).json({ 
            message: "thank you for signing up",
            token: token,
            username: newUser.username 
        });

        } catch(error) {
            res.status(500).json({message: error.message});
        }
    });
   
// loggin in
router.post("/login", async (req, res) => {
    try{
        const { username, tokenPattern } = req.body;

        const user = await User.findOne({ 
            $or: [{ username: username }, { email: username }] 
        });


        if (!user) {
            return res.status(400).json({message: "user not found, please sign in"});
        }

        const tokenString = tokenPattern.join('-');

        const isMatch = await bcrypt.compare(tokenString, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "incorrect pattern"});
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "24h" } 
        );

        res.json({ 
            message: "Login successful!",
            token: token,
            username: user.username
        });

        } catch(error) {
        res.status(500).json({ message: error.message });
    }
    
});



module.exports = router;