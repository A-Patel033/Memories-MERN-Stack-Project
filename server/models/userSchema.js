import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide valid email."]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    id: {type: String}
})

export default mongoose.model('User', userSchema);