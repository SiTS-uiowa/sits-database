const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: String,
  checked: Boolean,
});

module.exports = mongoose.model('Todo', TodoSchema);