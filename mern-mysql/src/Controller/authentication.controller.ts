import { NextFunction, Request, Response } from "express";
import { User } from "../entity";
import cloudinary from "cloudinary";
import { ErrorHandler, sendEmail, sendToken, Jwtservice } from "../Utils";
import { FRONTEND_URL } from "../../Config";
import crypto from "crypto";
import Logger from "../../Config/Logger";
import { getRepository } from "typeorm";
import log from "../Logger";
let NAMESPACE = "AUTHENTICATION CONTROLLER";

const authorizationController = {
    async registration(req: Request, res: Response, next: NextFunction) {
        NAMESPACE = "Registration";
        try {
            const repository = getRepository(User);

            const { name, email, password } = req.body;
            let requestuser = new User();
            requestuser.name = name;
            requestuser.email = email;

            // bcryptpassword
            requestuser.password = requestuser.setPassword(password);
            const user = await repository.save(requestuser);
            sendToken(user, 201, res);
        } catch (error: any) {
            return next(new ErrorHandler(error, 500));
        }
    },
    async login(req: Request, res: Response, next: NextFunction) {
        NAMESPACE = "Login";
        try {
            const repository = getRepository(User);
            const { email, password } = req.body;
            if (!email || !password) {
                return next(new ErrorHandler("Please Enter Email & Password", 400));
            }
            const user = await repository.findOne({ email: email });
            if (!user) {
                return next(new ErrorHandler("Invalid Email and password", 400));
            }

            // const isPasswordMatched = await user.isValidPassword(password);
            // if (!isPasswordMatched)
            // {
            //     return next(new ErrorHandler("Invalid Email and password", 400));
            // }
            const token = Jwtservice.sign({ email: user.email });
            sendToken(user, 200, res);
        } catch (error: any) {
            return next(new ErrorHandler(error, 500));
        }
    },
    // async forgotPassword(req: Request, res: Response, next: NextFunction) {
    //     NAMESPACE = "Forgot Password";
    //     const repository = getRepository(User);
    //     const user = await repository.findOne({ email: req.body.email });
    //     if (!user) {
    //         return next(new ErrorHandler("User Not Found", 404));
    //         // return res.status(404).json({msg:"user not found"});
    //     }
    //     const resetToken = user.getResetPasswordToken();
    //     await user.save({ validateBeforeSave: false });

    //     const resetPasswordUrl = `${FRONTEND_URL}/password/reset/${resetToken}`;

    //     const message = `Your password reset token is:- ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it\n\n `;

    //     try {
    //         await sendEmail({
    //             email: user.email,
    //             subject: `${user.name} Password Recovery`,
    //             message,
    //         });
    //         Logger.info(NAMESPACE, `${message}`);
    //         res.status(200).json({
    //             success: true,
    //             message: `Email sent to ${user.email} successfully`,
    //         });
    //     } catch (error: any) {
    //         user.resetPasswordToken = undefined;
    //         user.resetPasswordExpire = undefined;
    //         await user.save({ validateBeforeSave: false });
    //         return next(new ErrorHandler(error.message, 500));
    //     }
    // },
    // async passwordReset(req: Request, res: Response, next: NextFunction) {
    //     NAMESPACE = "Password Reset";
    //     try {
    //         console.log(req.body);
    //         const resetPasswordToken = crypto
    //             .createHash("sha256")
    //             .update(req.params.token)
    //             .digest("hex");
    //         const user = await User.findOne({
    //             resetPasswordToken,
    //             resetPasswordExpire: { $gt: Date.now() },
    //         });
    //         if (!user) {
    //             return next(
    //                 new ErrorHandler(
    //                     "Reset password token is Invalid or has been expired",
    //                     404
    //                 )
    //             );
    //         }

    //         if (req.body.password !== req.body.confirmPassword) {
    //             return next(new ErrorHandler("Password doesn't match", 400));
    //         }
    //         user.password = req.body.password;
    //         user.resetPasswordToken = undefined;
    //         user.resetPasswordExpire = undefined;
    //         await user.save();
    //         sendToken(user, 200, res);
    //     } catch (error: any) {
    //         return next(new ErrorHandler(error, 500));
    //     }
    // },
    async logout(req: Request, res: Response, next: NextFunction) {
        NAMESPACE = "Logout";
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });
            res.status(200).json({
                success: true,
                message: "Successfully Logout",
            });
        } catch (error: any) {
            return next(new ErrorHandler(error, 500));
        }
    },
};

export default authorizationController;
