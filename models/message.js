const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', (message) => {
    User.findById(message.user, (err, user) => {
        user.messages.pull(message._id);
        user.save();
    })
})

module.exports = mongoose.model('Message', schema);