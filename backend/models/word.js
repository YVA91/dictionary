const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  word: [
    { wordEn: String, wordRu: String },
  ],
});

module.exports = mongoose.model('movie', cardSchema);
