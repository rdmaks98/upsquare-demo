/** @format */
import CustomErrorHandler from '../../services/CustomErrorHandler';
import {User} from "../../models"
import Joi from "joi"
import bcrypt from "bcryptjs";
import sendEmail from '../../sendEmail/sendmail';

const resetpasswordController = {

	async resetPass(req,res,next){
		const resetToken = req.params.token;
		const userPass = await User.findOne({ resetPasswordToken: resetToken, resetPasswordExpire: { $gt: Date.now() } });
		if (!userPass) {
			return next(CustomErrorHandler.invalidToken());
		}

		// validation 
		const PasswordSchema = Joi.object({
			password: Joi.string()
				.pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))
				.required(),
			repeat_password: Joi.ref('password'),
		});	
		const { error } = PasswordSchema.validate(req.body);
		if (error) {
			return next(error);
			// throw error;
		}

		// password save in database
		const {password} = req.body;
		const message = "your password reset sucessfully";
		try{
			const hashedPassword = await bcrypt.hash(password, 10);
			userPass.password = hashedPassword;
			userPass.resetPasswordToken = undefined;
			userPass.resetPasswordExpire = undefined;
			await userPass.save()
			await sendEmail({
				email: userPass.email,
				subject: `Reset Passsowrd is change`,
				message,
			});
			return res.json({
				statusCode:200,
				message:"Your Password Reset Sucessfully",
			});	
		}
		catch(err){
			return next(err)
		}
	}
};

export default resetpasswordController;
