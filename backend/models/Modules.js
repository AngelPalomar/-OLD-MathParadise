const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ModuleSchema = Schema({
    name: String,
    active: Boolean
})