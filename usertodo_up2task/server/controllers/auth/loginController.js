/** @format */

const Joi = require ('joi');
const { User } = require ('../../models');
const CustomErrorHandler = require ('../../services/CustomErrorHandler');
const bcrypt = require ('bcryptjs');
const JwtService = require ('../../services/JwtServices');

const loginController = {
	async login(req, res, next) {
		
		// validation
		const loginSchema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string()
				.pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))
				.required(),
		});

		const { error } = loginSchema.validate(req.body);

		if (error) {
			next(error);
		}

		let { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			res.json(CustomErrorHandler.invalidEmail());
		}

		// compare a password
		const matchpass = await bcrypt.compare(password, user.password);
		if (!matchpass) {
			res.json(CustomErrorHandler.invalidEmail());
		}

		try {
			// token
			let generate_token = JwtService.sign({ _id: user._id,role:user.role});
			res.cookie('access_token', generate_token, {
				httOnly: true,
				secure: false,
				expires: new Date(Date.now() + 960000),
			});
			res.json({ generate_token: generate_token, statusCode: 200, message:"login succesfully" });
		} catch (err) {
			next(err);
		}
	
	},

	async logout(req, res) {
		res.clearCookie("access_token");
		res.json({
			statusCode:200,
			message:"logout Succesfully",
		})
	}
};

export default loginController;
