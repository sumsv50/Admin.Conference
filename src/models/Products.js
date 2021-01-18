const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    name: String,
    img: [Object],
    speaker:String,
    venue: String,
    num_viewer: {Number, default: 0},
    max_viewer: Number,
    detail: String,
    date: String,
    type_viewer: String,
    slug: { type: String, slug: ['name', 'speaker'], unique: true },
}, { timestamps: true });

Product.plugin(mongoosePaginate);

// Model name => collection
module.exports = mongoose.model('Product', Product, 'conferences');

