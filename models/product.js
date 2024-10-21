import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model, Types } from "mongoose";

 export const productSchema = new Schema({
    productName: {type: String, required: true},
    description: {type: String},
    categoryId: {type: Types.ObjectId, ref: 'Category' },
    images: {type: String, required:true}, //issue uploading when i make image required
    price: {type: Number, required: true},
 },
{ timestamps: true
}) 

productSchema.plugin(toJSON);

export const productModel = model('Product', productSchema);
