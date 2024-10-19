import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    avatar: {type: String},
    userName: {type: String, required: true},
    businessName: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
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