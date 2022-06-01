const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('./middlewares/cors');
const adsController = require('./controllers/ads');
const usersController = require('./controllers/users');
const auth = require('./middlewares/auth');
const path = require('path');

start();

async function start() {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017',
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
        });
        console.log('Database ready');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(auth());
//     app.use(express.static('public'));
//     app.get('*',(req,res)=>{
//       res.sendFile(path.join(__dirname,'public/index.html'));
//   });
    app.use('/ads', adsController);
    app.use('/users', usersController);

    const port = process.env.PORT || 3030;

    app.get('/', (req, res) => res.json({ message: 'REST service operational'}));

    app.listen(port, () => console.log(`REST service started on port ${port}`));
}