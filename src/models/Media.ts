import mongoose from 'mongoose';
const { Schema } = mongoose;

const mediaSchema = new Schema({
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
    },
    assetId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Media = mongoose.model('Media', mediaSchema);
export default Media;