const moongose = require('mongoose');
const Schema = moongose.Schema;

const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
    used: {
        type: Boolean,
        default: false
    }
})

module.exports = moongose.model("Token", TokenSchema)
