import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import * as JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config"
import { UserService } from "../services/user.service";
import { Service } from "typedi";

@Service()
export class UserController {
    constructor(private userService: UserService) { }

    public async signUp(req: Request, res: Response) {
        const user: IUser = req.body;
        const newUser = await this.userService.create(user);
        if (newUser == null) {
            return res.status(403).json({ message: "email already exists" });
        } else {
            const token = this.signToken(newUser);
            res.json({ token });
        }
    }

    public async signIn(req:Request, res:Response){
        const user: IUser = req.body;
        const token = this.signToken(user);
        res.json({token});
    }

    private signToken = (user: IUser) => {
        return JWT.sign({
            iss: 'Freelancer',
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1) // current date tiem + 1 day,
        }, JWT_SECRET);
    }
}