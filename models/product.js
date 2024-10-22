import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model} from "mongoose";

export const productSchema = new Schema({
   productName: { type: String, required: true },
   description: { type: String },
   category: {
      type: String,
      enum: ['appliances', 'furniture', 'clothing', 'groceries', 'electronics'],
      required: true
   },
   images: { type: String, required: true }, //issue uploading when i make image required
   price: { type: Number, required: true },
   discountPercentage: {type: Number, default: 0},
   discountedPrice: {type: Number}
},
   {
      timestamps: true
   })

productSchema.plugin(toJSON);

export const productModel = model('Product', productSchema);
