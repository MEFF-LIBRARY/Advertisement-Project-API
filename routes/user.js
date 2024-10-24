import { Router } from "express";
import { getUserAdverts, getUserProfile, loginUser, logoutUser, registerUser, userProfileUpdate } from "../controllers/user.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import { userAvatarUpload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser);

userRouter.get('/users/me', isAuthenticated, hasPermission('get_profile'), getUserProfile);

userRouter.get('/users/me/adverts',isAuthenticated, getUserAdverts)

userRouter.post('/users/logout', isAuthenticated, logoutUser)

userRouter.patch('/users/me', isAuthenticated, hasPermission('update_profile'), userAvatarUpload.single('avatar'), userProfileUpdate);

export default userRouter;