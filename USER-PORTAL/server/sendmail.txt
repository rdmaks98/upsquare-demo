/** @format */

import nodeMailer from 'nodemailer';
import {
	SMTP_MAIL,
	SMTP_SERVICE,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_PASS,
} from '../config';
import CustomErrorHandler from '../services/CustomErrorHandler';

const sendEmail = async (options) => {
	try {
		const transporter = nodeMailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			service: SMTP_SERVICE,
			secure: false,
			requireTLS: true,
			auth: {
				user: SMTP_MAIL,
				pass: SMTP_PASS,
			},
		});
		// console.log(options);
		const mailOptions = {
			from: SMTP_MAIL,
			to: options.email,
			subject: options.subject,
			text: options.message,
		};
		return await transporter.sendMail(mailOptions);
	} catch (err) {
		return new CustomErrorHandler(err.msg, 500);
	}

	//   res.status(200).json({ success: true, msg: "mail send successfully" });
};
export default sendEmail;
