const express = require('express');
const router = express.Router();
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/', (req, res, next) => {
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,      
        password: bcript.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save()
        .then((data) => {
            return res.status(201).json({
                message: 'User saved',
                obj: data
            })
        })
        .catch((err) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        })
});

router.post('/signin', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if(user.length == 0){
                return res.status(500).json({
                    title: 'Login not correct'
                })
            }
            if(!bcript.compareSync(req.body.password, user.password)){
                return res.status(401).json({
                    title: 'Password wrong!'
                })
            }
            let token = jwt.sign({ user }, 'secret', { expiresIn: 7200 });
            res.status(200).json({
                message: 'Successfully',
                token: token,
                userId: user._id
            })
        })
        .catch((err) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        })
})

module.exports = router;
