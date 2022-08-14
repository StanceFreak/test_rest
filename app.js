require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => {
  console.log(error)
})

db.once('connected', () => {
  console.log('Database Connected')
})

const app = express();

app.use(cors())
app.use(express.json());

const categoryRoutes = require('./routes/category.route')
const authRoutes = require('./routes/auth.route')

app.use('/api', authRoutes)
app.use('/api', categoryRoutes)

var listener = app.listen(3000, () => {
  console.log('Server running at port: ' + listener.address().port)
})
