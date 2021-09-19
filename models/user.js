const { model, Schema } = require('mongoose');

const User = new Schema({
    id: { type: String, required: true },
    coins: { type: Number, default: 0 }
});

module.exports = model('user', User);