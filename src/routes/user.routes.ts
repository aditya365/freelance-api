import { UserController } from "../controllers/user.controller";

export class UserRoutes {
    public routes(app: any): void {
        const userController: UserController = new UserController();
        console.log(userController);
        app.route('/users/signup').post(userController.signUp);
        app.route('/users/sample').post(userController.sample);
    }
}