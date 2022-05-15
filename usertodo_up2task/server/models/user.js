/** @format */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profilePhoto: { data: Buffer,type: String },
		role:{ type: String, default: "user" },
		resetPasswordToken: String,
		resetPasswordExpire: Date ,
	},
	{ timestamps: true }
);

export default mongoose.model('User', userSchema, 'users');