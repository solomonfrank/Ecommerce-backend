import mongoose from 'mongoose';
import userSchema from './schema/userSchema';

const User = mongoose.model('User', userSchema);

export default User;
