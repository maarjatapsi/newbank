const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');


router.post('/', async (req, res, next) => {
    try {
        const { username, password} = req.body;
        const user = await User.findOne({ username });
        if (!user) return next(new Error('Username does not exist'));
        const validPassword = (password === user.password);
        if (!validPassword) return next(new Error('Password is not correct'))
        const token = jwt.sign( { userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { token })
        res.status(200).json({
            token
        })
    } catch (error) {
        next(error);
    }
});

//router.delete('/', (req, res) => {
//    res.sendStatus(204)
//})

module.exports = router;