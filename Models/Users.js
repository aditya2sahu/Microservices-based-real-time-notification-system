const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')


const UserSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    connected: {
        type: Boolean,
        required: false,
        default: false
    },
},
    {
        timestamps: true,
    })

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const Users = model('Users', UserSchema)

module.exports = Users