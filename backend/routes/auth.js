const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// registering routes
router.post("/register", async (req, res) => {
    try{

        const {username, email, tokenPattern} = req.body;

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

        res.json({message: "welcome"});

        } catch(error) {
            res.status(500).json({message: error.message});
        }
    });
   
// loggin in
router.post("/login", async (req, res) => {
    try{
        const { email, tokenPattern } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message: "user not found, please sign in"});
        }

        const tokenString = tokenPattern.join('-');

        const isMatch = await bcrypt.compare(tokenString, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "incorrect pattern"});
        }
        res.json({ message: "Login successful!" });

        } catch(error) {
        res.status(500).json({ message: error.message });
    }
    
});

module.exports = router;