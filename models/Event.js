const mongoose =require('mongoose')
const Schema = mongoose.Schema


const EventSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = Event = mongoose.model('event', EventSchema)

