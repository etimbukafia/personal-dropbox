import mongoose from 'mongoose';

const schema = mongoose.schema;

const mediaSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    cloudinaryLink: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('media', mediaSchema)