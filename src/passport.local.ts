import * as passportLocal from "passport-local";
import passport from "passport";
import userModel, { IUser, userSchema } from "./models/user.model";
import { UserController } from "controllers/user.controller";

const localStrategy = passportLocal.Strategy;

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email: string, password: string, done) => {
    try {
        //Find the user by email
        const user = await userModel.findOne({ email });
        //if not found return error
        if (!user) {
            return done(null, false);
        }
        //else check for password
        const isValid = await user.isValidPassword(password);
        if (!isValid) {
            return done(null, false);
        }
        //if passpowrd maches return the user
        return done(null, user);
    } catch (error) {
        done(null, error);
    }
}))