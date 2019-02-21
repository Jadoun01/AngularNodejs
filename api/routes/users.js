const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require("../models/users");

router.get('/', (req, res, next) => {
    User.find()
    .select('userType userName email mobileNo')
    .exec()
    .then(result => {
        if(result.length > 0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: "No Result Found"
            });
        }        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    User.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "User Already Exists with the same email Address."
            });
        }else{            
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{            
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        userType: req.body.userType,
                        userName: req.body.userName,
                        email: req.body.email,
                        mobileNo: req.body.mobileNo,
                        password: hash
                    });

                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User Created Successfully"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            });
        }
        
    });
});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'User not found'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Username/Password did not match.'
                });
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userID: user[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });

                return res.status(200).json({
                    message: "Auth Successfull",
                    token: token
                });
            }else{
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;
