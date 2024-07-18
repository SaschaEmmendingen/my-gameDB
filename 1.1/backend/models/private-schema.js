import mongoose from "mongoose";

const privateSchema = new mongoose.Schema({
    interpret: { type: String, required: true },
    genre: { type: String, required: true },
    subgenre: { type: String, required: true },
    
});

const Private = mongoose.model('Private', privateSchema)

export default Private;