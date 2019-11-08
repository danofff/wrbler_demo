const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function (req, res, next) { 
    console.log(req.body);
    try {
        const user = await db.User.findOne({
            email: req.body.email
        });
        const {id, username, profileImageUrl} = user;
        const isMatch = await user.comparePassword(req.body.password);
        console.log(isMatch);
        if(isMatch){
            const token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        }
        else {
            return next({
                status: 400,
                message: 'Invalid Email/Password.'
            });
        }
    } catch (error) {
        return next({
            status: 400,
            message: 'Invalid Email/Password.'
        });
    }
}

exports.signup = async function(req, res, next){
    try {
        //creating a user
        console.log(req.body);
        let user = await db.User.create(req.body);
        let {id, username, email, profileImageUrl} = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);

        console.log(id, username, profileImageUrl);
        const response = {id, username, email, profileImageUrl, token};
        console.log(id, username, );

        return res.status(200).json({
            id,
            username,
            email,
            profileImageUrl, 
            token
        });
    } catch (error) {
        if(error.code === 11000){
            error.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: error.message
        });
    }
}