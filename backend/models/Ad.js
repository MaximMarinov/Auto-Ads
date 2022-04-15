const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    year: {
        type: Number,
        required: true,
        min: [1950, 'Year must be between 1950 and 2022'],
        max: [2022, 'Year must be between 1950 and 2022']
    },
    engine: { type: String, required : true },
    transmission: { type: String, required : true },
    place: { type: String, required : true },
    cubature: { type: Number, required : true },
    mileage: { type: Number, required : true },
    category: { type: String, required : true },
    eurostandard: { type: Number, required : true },
    color: { type: String, required : true },
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
    price: { type: Number, required: true },
    owner: { type: ObjectId, ref: 'User' }
});

const Ad = model('Ad', schema);

module.exports = Ad;