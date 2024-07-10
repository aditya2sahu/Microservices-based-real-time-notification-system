const { Schema, model } = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const NotificationSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    messgae: {
        type: String,
        require: true
    },
    read: {
        type: Boolean,
        default: false
    },
    user: {
        type: String,
        ref: 'Users',
    },
}, {
    timestamps: true
})

const Notifications = model("Notifications",NotificationSchema)

module.exports = Notifications