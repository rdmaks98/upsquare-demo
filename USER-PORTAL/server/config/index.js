/** @format */

require('dotenv').config({ path: './config.env' });

export const {
	APP_PORT,
	DEBUG_MODE,
	DB_URL,
	JWT_SECRET,
	SMTP_MAIL,
	SMTP_SERVICE,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_PASS,
} = process.env;
