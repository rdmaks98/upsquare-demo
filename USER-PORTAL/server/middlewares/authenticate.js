/** @format */
import JwtService from '../services/JwtServices';

const authenticate = async (req, res, next) => {
	const settoken = req.headers.authorization;
	// const settoken = req.cookies.access_token;
	if (!settoken) {
		return res.status(403).send({
			status: 1,
			message: 'un authorized',
		});
	}

	try {
		const { _id,role } = await JwtService.verify(settoken);
		const user = {
			_id,
			role
		};
		req.user = user;
		return next();
	} catch (err) {
		res.json({
			statusCode: 403,
			message: 'un authorized',
		});
	}
};

export default authenticate;
