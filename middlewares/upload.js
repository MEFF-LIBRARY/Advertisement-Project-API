import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const userAvatarUpload = multer ({
    Storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/advert-api/users/*'
    }),
    preservePath: true
});