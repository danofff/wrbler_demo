const mongoose = require('mongoose');
const User = require('./User');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

messageSchema.pre('remove', async function(next){
    try {
        const user = await User.findById(this.userId);
        user.messages.remove(this.id);
        await user.save();
        return next();
    } catch (error) {
        return next(error);
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;