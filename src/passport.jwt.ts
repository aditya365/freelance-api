import passport from 'passport';
import passportJWT, { ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from './config';
import userModel from './models/user.model';

export const jwtStrategy = passportJWT.Strategy;

// specify jwt options and callback to handle
passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //find if user exists from token
        const user = userModel.findById(payload.sub);
        //if not send un authorized error
        if (!user) {
            return done(null, false);
        }
        //else send the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));
