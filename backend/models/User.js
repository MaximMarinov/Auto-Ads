const { model, Schema, Types: { ObjectId }  } = require('mongoose');

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: [true, 'Email is required'] },
    hashedPassword: { type: String, required: true },
    ads: { type: [ObjectId], ref: 'Ad', default: [] }
});


userSchema.index({ email: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

const User = model('User', userSchema);

module.exports = User;