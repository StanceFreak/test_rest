const Model = require('../models/userModel');
const bcrypt = require('bcrypt')

exports.signup = async (req, res) => {

  Model.findOne({
    $or: [{
      nama: req.body.nama
    }, {
      email: req.body.email
    }, {
      no_hp: req.body.no_hp
    }]
  }).then(user => {
    if(user) {
      let errors = {};
      if (user.nama === req.body.nama) {
        errors.nama = "Nama sudah terdaftar"
      } 
      if (user.no_hp === req.body.no_hp) {
        errors.no_hp = "No hp sudah terdaftar"
      }
      if (user.email === req.body.email) {
        errors.email = "Email sudah terdaftar"
      }
      return res.status(400).json(errors);
    }
    else {

      const userData = new Model({
        nama: req.body.nama,
        no_hp: req.body.no_hp,
        email: req.body.email,
        password: req.body.password
      })

      const saveData = userData.save();
      res.status(200).json(saveData)

    }
  }).catch(err => {
    return res.status(500).json({ error: err })
  })

}

exports.signin = async (req, res) => {

  Model.findOne({
    nama: req.body.nama
  }).then(user => {
    if(!user) {
      return res.status(404).send({ message: "User tidak ditemukan" })
    }
    else {
      var isPassValid = bcrypt.compareSync(req.body.password, user.password)

      if (!isPassValid) {
        return res.status(401).send({ message: "Password salah" })
      }
      else {
        res.status(200).send({
          id: user._id,
          nama: user.nama,
          email: user.email,
          no_hp: user.no_hp,
          password: user.password
        })
      }
    }
  })

}