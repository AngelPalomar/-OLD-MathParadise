const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstitutionSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    abbrev: String,
    type: String,
    city: String,
    country: String
})

module.exports = mongoose.model("Institution", InstitutionSchema)