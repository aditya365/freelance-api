import { UserController } from "../controllers/user.controller";
import Container from "typedi";
import passport from "passport";

const local = passport.authenticate('local', { session: false });

export class UserRoutes {
    public routes(app: any): void {
        const userController: UserController = Container.get(UserController);
        app.route('/users/signup')
            .post(userController.signUp.bind(userController));

        app.route('/users/signin')
            .post(local, userController.signIn.bind(userController))
    }
}