const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nama_kategori: {
    required: true,
    trim: true,
    type: String
  },
  slug: {
    required: true,
    unique: true,
    type: String
  },
  parentId: {
    type: String
  }

})

module.exports = mongoose.model('Category', categorySchema)