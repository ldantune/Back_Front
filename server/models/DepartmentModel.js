const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    'name': String,
}, {versionKey: false});

module.exports = mongoose.model('Department', DepartmentSchema);