const Item = require('../models/Ad');


async function getAll() {
    return Item.find({});
}

async function create(item) {
    const result = new Item(item);
    await result.save();

    return result;
}

function getById(id) {
    return Item.findById(id);
}

async function update(id, item) {
    const existing = await Item.findById(id);

    existing.title = item.title;
    existing.img = item.img;
    existing.year = item.year;
    existing.engine = item.engine;
    existing.transmission = item.transmission;
    existing.place = item.place;
    existing.cubature = item.cubature;
    existing.mileage = item.mileage;
    existing.eurostandard = item.eurostandard;
    existing.color = item.color;
    existing.description = item.description;
    existing.price = item.price;

    await existing.save();

    return existing;
}

async function deleteById(id) {
    await Item.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById
};