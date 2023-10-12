const {schema, model} = require('mongoose')

const User = new Schema({
    //id for table mongoose is adding by default, so we need to add id
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    diskSpace: {
        type: Number,
        default: 1024**3*10
    },
    usedSpace: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
    },
    files:[
        {type: ObjectId, ref: 'File'}
    ]

})

module.exports = model('User', User)