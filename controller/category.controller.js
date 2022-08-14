const Category = require('../models/categoryModel');
const slugify = require('slugify')

exports.addCategory = async (req, res) => {
  const categoryObj = {
    nama_kategori: req.body.nama_kategori,
    slug: slugify(req.body.nama_kategori)
  }

  if(req.body.parentId) {
    categoryObj.parentId = req.body.parentId
  }

  const cat = new Category(categoryObj)
  cat.save((err, category) => {
    if(err) {
      return res.status(400).json({ error: err })
    }
    if(category) {
      return res.status(201).json({ category })
    }
  })
}