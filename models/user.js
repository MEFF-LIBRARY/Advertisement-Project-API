import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    avatar: {type: String},
    userName: {type: String, required: true},
    businessName: {type: String},
    email: {type: String, required: true},     // i think we should make the email unique
    password: {type: String, required: true},
    // i think we should add number of characters: 10 for phone enumber
    phone: {type: Number, required: true},
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'vendor', 'admin', 'superadmin']
    }
}, {
    timestamps: true
});


userSchema.plugin(toJSON);

export const UserModel = model('User', userSchema);