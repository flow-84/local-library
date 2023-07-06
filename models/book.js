const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]
});

// Virtuelles Attribut für die URL des Buchs
BookSchema.virtual('url').get(function() {
  return '/books/' + this._id;
});

// Exportieren des Modells
module.exports = mongoose.model('Book', BookSchema);
