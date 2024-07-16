import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    interpret: { type: String, required: true },
    genre: { type: String, required: true },
    subgenre: { type: String, required: true },
    
});

const Music = mongoose.model('Music', musicSchema)

export default Music;