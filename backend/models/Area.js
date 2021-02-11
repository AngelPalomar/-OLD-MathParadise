const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AreaSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    status: Boolean
})

module.exports = mongoose.model("Area", AreaSchema)