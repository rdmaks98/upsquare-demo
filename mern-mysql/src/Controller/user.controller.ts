import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import cloudinary from 'cloudinary';
import { User } from "../entity";
import { ErrorHandler, sendToken } from "../Utils";


let NAMESPACE = "USER CONTROLLER";
const userController = {
  async testing(req: Request, res: Response, next: NextFunction) {
    NAMESPACE = "Registration";
    res.status(200).json({ "message": "Your Controller Connected" })
  },

  async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(User);
      // @ts-ignore
      const user = await repository.find(req.user.id);
      res.status(200).json({ success: true, user });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async getAllUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(User)
      const users = await repository.find();
      res.status(200).json({ success: true, users });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  // if authenticated
  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(User)
      // @ts-ignore
      const user = await repository.findOne(req.user.id).select("+password");
      const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password Is Incorrect", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Doesn't match", 400));
      }
      //@ts-ignore

      user.password = req.body.newPassword;
      //@ts-ignore
      await user.save();
      sendToken(user, 200, res);
      res.status(200).json({ success: true, user });
    } catch (error: any) {
      return new ErrorHandler(error, 500);
    }
  },
  // get single user - admin
  async getSingleUser(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(User)
      const user = await repository.findOne(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 402)
        );
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return new ErrorHandler(error, 500);
    }
  },
  async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };

      if (newUserData) {
        //   @ts-ignore
        repository.merge(newUserData, req.body)
        const repository = getRepository(User)
        const result = await repository.save(newUserData)
      }
      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      return new ErrorHandler(error, 500);
    }
  },

  async updateUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(User)

      const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };

      if (req.body.avatar !== "") {
        // @ts-ignore
        const user = await repository.findOne(req.user.id);

        // @ts-ignore
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
        //@ts-ignore
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      //@ts-ignore
      const user = await repository.findOne(req.user.id);
      if (newUserData) {
        //   @ts-ignore
        repository.merge(newUserData, req.body)
        const result = await repository.save(newUserData)
      }
      res.status(200).json({
        success: true,
      });

      next();
    } catch (error: any) {
      return new ErrorHandler(error, 500);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(User)

      const user = await repository.findOne(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
      }

      // @ts-ignore
      await user.delete();

      res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
      });
    } catch (error: any) {
      return new ErrorHandler(error, 500);
    }
  },
};

export default userController;