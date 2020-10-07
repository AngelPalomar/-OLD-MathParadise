const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fkHelper = require('../helpers/ForeignKeyHelper')

const GroupSchema = Schema({
    access_code: {
        type: String,
        unique: true
    },
    name: String,
    description: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        validate: {
            validator: function (v) {
                return fkHelper(mongoose.model('User'), v);
            },
            message: 'This user does not exists.'
        }
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        validate: {
            validator: function (v) {
                return fkHelper(mongoose.model('User'), v);
            },
            message: 'This user does not exists.'
        }
    }]
})

module.exports = mongoose.model("Group", GroupSchema)