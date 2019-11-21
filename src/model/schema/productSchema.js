import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'product name is required'],
    trim: true
  },
  discount: String,
  price: {
    type: Number,
    required: [true, 'price is category'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'image is required']
  }
});

export default productSchema;
