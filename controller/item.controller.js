const Model = require('../models/userModel');

exports.addItem = async (req, res) => {

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

exports.getAllItem = async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

//Get data by ID
exports.getUserById = async (req, res) => {
  const checkid = await Model.findById(req.params.id)
  if(!checkid) {
    return res.status(404).json({error: "Data not found"})
  }
  else {
    try{
      const data = await Model.findById(req.params.id);
      res.json(data)
  }
    catch(error){
        res.status(500).json({error: error.message})
    }
  }
}

//Update data by ID
exports.getItemById = async (req, res) => {
  const checkid = await Model.findById(req.params.id)
  if(!checkid) {
    return res.status(404).json({error: "Data not found"})
  }
  else {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
  }
}

//Delete data by ID
exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}