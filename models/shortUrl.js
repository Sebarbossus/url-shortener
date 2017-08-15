//Template/structure/model of document for shortURL
//Require Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
originalUrl: String,
shortenedUrl: String
}, {timestamps: true});

const ModelClass = mongoose.model('shortUrl', urlSchema);

module.exports = ModelClass;