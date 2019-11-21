import mongoose from 'mongoose';
import orderSchema from './schema/userSchema';

const orderModel = mongoose.model('Orders', orderSchema);

export default orderModel;
