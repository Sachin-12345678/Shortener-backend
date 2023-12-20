const mongoose = require('mongoose');

const shortURLSchema = mongoose.Schema({
    originalURL: { type: String, required: true },
    shortURL: { type: String, required: true, unique: true },
});

const ShortModel=mongoose.model("ShortURL",shortURLSchema)

module.exports={
    ShortModel
}

