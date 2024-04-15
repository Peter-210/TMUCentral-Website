const {Schema, model} = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const User = model('User', new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
}));

const Ad = model('Ad', new Schema({
    postDate: {type: Date, required: true},
    title: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: false},
    location: {type: String, required: true},
    sold: {type: Boolean, required: false},
    image: {type: String, required: false},
    email: {type: String, required: true},
    category: {type: [
        "itemWanted", 
        "itemForSale", 
        "academicService"
    ], required: true}
}));

module.exports = {User, Ad}
