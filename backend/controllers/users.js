const router = require('express').Router();
const { isGuest, isAuth } = require('../middlewares/guards');
const { register, login, logout, getProfileInfo, editProfileInfo } = require('../services/users');
const mapErrors = require('../utils/mapper');


router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.fullName.trim() == '' 
            || req.body.password.trim() == ''
            || req.body.email.trim() == ''
            || req.body.phone.trim() == '' ) {
            throw new Error('Full name, email, phone number and password are required');
        }

        const result = await register(
            req.body.fullName.trim(),
            req.body.email.trim().toLowerCase(),
            req.body.phone.trim().toLowerCase(),
            req.body.password.trim()
        );
        res.cookie('authcookie', result.accessToken, {httpOnly:true}).status(201).json(result);
        
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.cookie('authcookie', result.accessToken, {httpOnly:true}).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/profile', isAuth(), getProfileInfo);
router.put('/profile', isAuth(), editProfileInfo);

router.get('/logout', (req, res) => {
    logout(req.user?.token);
    res.clearCookie('authcookie').status(204).end();
});

module.exports = router;