import mongoose from 'mongoose';
import userSchema from './schema/userSchema';

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
