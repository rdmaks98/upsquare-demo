/** @format */

import express from 'express';
import multer from 'multer';
import {
	registerController,
	loginController,
	forgotpasswordController,
	resetpasswordController,
	userController,
} from '../controllers';
import authenticate from '../middlewares/authenticate';

const app = express();
const router = express.Router();

// user image
router.use('/public/uploads/',express.static(__dirname + './public/'));

var Storage = multer.diskStorage({
	destination: './public/uploads',
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
	},
});

const fileFilter = (req,file,cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
		cb(null,true)
	}
	else{
		cb(null,false)
	}
}

var upload = multer({
	storage: Storage,limits:{
		fileSize : 1024*1024*8
	},
	fileFilter:fileFilter
});

app.use('/profile', express.static('public/uploads'));

// Authentication
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/logout',loginController.logout);

// control particular user
router.get('/me', authenticate, userController.me);
router.put('/update-profile/', authenticate, upload.single('profilePhoto'), userController.update);
router.get('/getuser', authenticate, userController.getUserById);
router.delete('/delete-user/:id',userController.deleteUser);

// change password
router.post('/change-password', authenticate, userController.changePassword);

// control all user
router.get('/user', authenticate, userController.getUser);

// search user with firstname and lastname
router.get('/search-user', userController.filter);

// forgot password
router.post('/forgot-password', forgotpasswordController.forgotPassword);
router.post('/reset-password/:token',resetpasswordController.resetPass);

export default router;
