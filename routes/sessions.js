const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');


router.post('/', async (req, res, next) => {
    try {
        const { username, password} = req.body;
        const user = await User.findOne({ username });
        if (!user) {return (res.status(400).json({error:"Username does not exist"}))}
        const validPassword = (password === user.password);
        if (!validPassword) {return (res.status(400).json({error:"Wrong password"}))}
        const token = jwt.sign( { userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { token })
        res.status(200).json({
            token
        })
    } catch (e) {
        next(e);
    }
});

//router.delete('/', (req, res) => {
//    res.sendStatus(204)
//})

module.exports = router;