const express = require('express');
const router = express.Router();
const bcript = require('bcryptjs');

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
                title: 'An error occurred123',
                error: err
            })
        })
});

module.exports = router;
