import { UserModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/user.js";
import { mailTransporter } from "../utils/mail.js";

// Register Users
export const registerUser = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // check if user already exist
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exist!');
        }

        // Hash user password
        const hashPassword = bcryptjs.hashSync(value.password, 10);

        // Save user into database
        await UserModel.create({
            ...value,
            password: hashPassword
        });

        // Send email
        await mailTransporter.sendMail({
            to: value.email,
            subject: "User Registration",
            text: `Welcome! ${value.userName}, your account has been registered successfully.\nEnjoy your stay\n\nThank you.`
        });

        // Respond to request
        res.json('User Registered!')
    } catch (error) {
        next(error);
    }
}


// Login Users
export const loginUser = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // find a user with identifier
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User does not exist');
        }

        // Compare their passwords
        const correctPassword = bcryptjs.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!');
        }

        // Sign a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        // Respond to request
        res.json({
            message: 'User Logged In!',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}


// Get User Profile
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await UserModel
            .findById(req.auth.id)
            .select({ password: false });

        res.json(user);
    } catch (error) {
        next(error);
    }
}


// Update Users
export const userProfileUpdate = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = updateUserValidator.validate({
            ...value,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }

        // Update user
        await UserModel.findByIdAndUpdate(req.auth.id, value);
        // Respond to request
        res.json('User profile updated');
    } catch (error) {
        next(error);
    }
}

// Logout Users
export const logoutUser = async (req, res, next) => {
    try {
        res.json('User Logged out')
    } catch (error) {
        next(error);
    }
}