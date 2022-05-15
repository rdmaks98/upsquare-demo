/** @format */

class CustomErrorHandler extends Error {
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}

	static alreadyExist(message) {
		return new CustomErrorHandler(409, message);
	}

	static invalidEmail(message = 'Username and password is wrong') {
		return new CustomErrorHandler(401, message);
	}

	static notFound(message = 'User is Not found') {
		return new CustomErrorHandler(404, message);
	}

	static unAuthorized(message = 'unauthorized') {
		return new CustomErrorHandler(403, message);
	}

	static userRegister(message = 'Please register') {
		return new CustomErrorHandler(404, message);
	}

	static invalidToken(message='your resetToken is invalid')
	{
		return new CustomErrorHandler(401, message);
	}
}

export default CustomErrorHandler;
