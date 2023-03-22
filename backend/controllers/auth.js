const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res) => {
    User.findOne({email: req.body.email}).exec((err, user) => {
        if(user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }
        let { name, email, password, role } = req.body;
        if(role == 'User'){
            role = 0;
        }else{
            role = 1;
        }

        let newUser = new User({name, email, password, role});
        newUser.save((err, success) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                message: 'Signup success! Please signin.'
            })
        })
    })
};

exports.signin = (req,res) => {
    const {email, password} = req.body;
    User.findOne({email}).exec((err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        };

        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        };

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie('token', token, {expiresIn: '1d'});
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        })
    });
};

exports.signout = (req, res) =>{
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};

exports.admin = (req, res) => {
    const { id } = req.body;
    User.findById({_id: id}).exec((err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if(user.role != 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            })
        }else{
            return res.status(200).json({
                message: 'Access Granted'
            })
        }
    })
}