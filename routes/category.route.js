const express = require('express');
const categoryController = require('../controller/category.controller')
const categoryRouter = express.Router();

categoryRouter.post('/categories/add', categoryController.addCategory)

module.exports = categoryRouter