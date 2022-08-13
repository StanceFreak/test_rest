const express = require('express');
const itemController = require('../controller/item.controller')
const itemRouter = express.Router();

itemRouter.get('/item', itemController.getAllUser)
itemRouter.get('/item/:id', itemController.getUserById)
itemRouter.patch('/item/:id', itemController.updateUser)
itemRouter.delete('/item/:id', itemController.deleteUser)

module.exports = itemRouter;