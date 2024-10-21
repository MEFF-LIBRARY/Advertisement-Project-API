import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"]
});


export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            // find user from the database
            const user = await UserModel.findById(req.auth.id);

            // Use the user role to find their permission
            const permission = permissions.find(value => value.role === user.role);
            if (!permission) {
                return res.status(403).json('No permission found!') //I think we should redefine the error message, for clarity
            }

            // Check if permission actions include action
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed!');  //I think we should redefine the error message, for clarity
            }
        } catch (error) {
            next(error);
        }
    }
}