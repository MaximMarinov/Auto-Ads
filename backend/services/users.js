const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const JWT_SECRET = 'gkldfgmfgnfdlkgmdfpgfgpvbv;mbfdjbdfdfhb{sdfsxb';
const blacklist = [];

async function register(fullName, email, phone, password) {
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (existing) {
        throw new Error('Email already exists');
    }

    const user = new User({
        fullName,
        email,
        phone,
        hashedPassword: await bcrypt.hash(password, 10)
    });

    await user.save();

    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return createSession(user);
}

function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;

    User.findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
        .then(user => { res.status(200).json(user); })
        .catch(next);
}

function editProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    const { tel, username, email } = req.body;

    User.findOneAndUpdate({ _id: userId }, { tel, username, email }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x); })
        .catch(next);
}

function logout(token) {
    blacklist.push(token);
}

function createSession(user) {
    return {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    };
}

function verifySession(token) {
    if (blacklist.includes(token)) {
        throw new Error('Token is invalidated');
    }
    
    const payload = jwt.verify(token, JWT_SECRET);
    
    return {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        _id: payload._id,
        token
    };
}

module.exports = {
    register,
    login,
    logout,
    verifySession,
    getProfileInfo,
    editProfileInfo
};