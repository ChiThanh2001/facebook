const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Message', messageSchema);