const router = require('express').Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: "User Already Exists"
            })
        }

        //hashed the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = await User(req.body)
        await newUser.save();
        res.send({
            success: true,
            message: "User Registered, Please login"
        });
    } catch (err) {
        console.log(err);
    }
})


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).send({
            success: false,
            message: "User does not exists"
        })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.send({
            success: false,
            message: "Invalid Passowrd"
        })
    }
    const token = jwt.sign({ userId: user._id, userName: user.userName, email: user.email, role: user.role }, process.env.secret_key, { expiresIn: '10d' });
    res.send({
        success: true,
        message: "User Logged In",
        token: token
    })

})

router.get('/all-users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.send({
            success: true,
            message: "Users fetched",
            data: users
        })
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
