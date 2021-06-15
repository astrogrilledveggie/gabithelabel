const mongoose = require('mongoose');

// const addressSubSchema = new mongoose.Schema({
//     addr_line_1: { type: String },
//     addr_line_2: { type: String },
//     unit: { type: String },
//     postal: { type: String },
//     city: { type: String },
//     state: { type: String },
//     country: { type: String }
// })

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, unique: true, max: 100 },
  pwsalt: { type: String },
  hash: { type: String, required: true },
  addresses: [
      {
          address: {
              type: String, required: true
          },
          postal: {
              type: String, required: true
          }
      }
  ],
  created_at: { type: Date },
  updated_at: { type: Date },
})

const userModel = mongoose.model('user', userSchema);

module.exports = {
    userModel: userModel
}