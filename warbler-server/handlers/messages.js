const db = require('../models');

exports.createMessage = async function(req, res, next){
    try {
        const message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        const user = await db.User.findById(req.params.id);
        user.messages.push(message.id);
        await user.save();
        foundMessage = db.Message.findById(message._id).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage);
    } catch (error) {
        next(error);
    }
}

exports.geteMessage = async function(req, res, next){
    try {
        const message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    } catch (error) {
        next(error);
    }
}

exports.removeMessage = async function(req, res, next){
    try {
        const message = await db.Message.findById(req.params.message_id);
        await message.remove();
        return res.status(200).json(message);
    } catch (error) {
        next(error);
    }
}