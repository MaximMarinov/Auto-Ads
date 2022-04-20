const { model, Schema, Types: { ObjectId } } = require('mongoose');

const IMG_PATTERN = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

const schema = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true, validate: {
        validator(value) {
            return IMG_PATTERN.test(value);
        },
        message: 'The image url must be in a "https://example.png / jpg / gif" format!'
    }},
    year: {
        type: Number,
        required: true,
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