const router = require('express').Router();
const api = require('../services/ads');
const { isAuth, isOwner } = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../middlewares/preload');
const User = require('../models/User');
const multer = require("multer");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext); 
    }
});

router.get('/', async (req, res) => {
    console.log(req.user);
    const data = await api.getAll();
    res.json(data);
});

router.post('/', multer(storage).single('img'), isAuth(), async (req, res) => {
    const item = {
        title: req.body.title,
        img: req.body.img,
        year: req.body.year,
        engine: req.body.engine,
        transmission: req.body.transmission,
        place: req.body.place,
        cubature: req.body.cubature,
        mileage: req.body.mileage,
        category: req.body.category,
        eurostandard: req.body.eurostandard,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,        
        owner: req.user._id
    };

    try {
        const result = await api.create(item);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item;
    res.json(item);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;
    const item = {
        title: req.body.title,
        img: req.body.img,
        year: req.body.year,
        engine: req.body.engine,
        transmission: req.body.transmission,
        place: req.body.place,
        cubature: req.body.cubature,
        mileage: req.body.mileage,
        category: req.body.category,
        eurostandard: req.body.eurostandard,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,      
    };

    try {
        const result = await api.update(itemId, item);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        const itemId = req.params.id;
        await api.deleteById(itemId);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/my-ads', isOwner(), async (req, res) => {
    try {
      const userId = req.user.id; 
      const result = await User.findById(userId).populate('ads');
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send('Something went wrong, check logs');
    }
});

module.exports = router;