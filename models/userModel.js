const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;

const dataSchema = new mongoose.Schema({
  nama: {
    required: true,
    type: String
  },
  no_hp: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
})

dataSchema.pre("save", function(next) {

  const user = this;

  if(!user.isModified("password")) {
    return next()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
    if(error) {
      return next(error)
    }
    else {
      bcrypt.hash(user.password, salt, function(error, hash) {
        if(error) {
          return next(error)
        }
        else {
          user.password = hash
          next()
        }
      })
    }
  })
})

dataSchema.pre("findOneAndUpdate", async function(next) {

  const user = this

  try {
    if (user._update.password) {
      const hashed = await bcrypt.hash(user._update.password, SALT_WORK_FACTOR)
      user._update.password = hashed;
    }
    else {
      next()
    }
  } catch (err) {
      return next(err);
  }
})

// dataSchema.methods.comparePassword = function(usersInput, callback) {
//   bcrypt.compare(usersInput, user.password, function(error, isMatch) {
//     if (error) {
//       return callback(error)
//     }
//     else {
//       callback(null, isMatch)
//     }
//   })
// }

module.exports = mongoose.model('User', dataSchema)