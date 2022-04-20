const { model, Schema, Types: { ObjectId }  } = require('mongoose');

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: [true, 'Email is required'], validate: {
        validator(value) {
            return EMAIL_PATTERN.test(value);
        },
        message: 'The email must be in the correct format!'
    } },
    phone: { type: String, required: [true, 'Phone number is required'],  minlength: [10, 'Phone number must be at least 10 characters long'] },
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