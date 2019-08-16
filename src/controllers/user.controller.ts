import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { JWT } from "jsonwebtoken";
import { JWT_SECRET } from "../configuration"

export class UserController {
    constructor(){
        
    }
    public async signUp(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(403).json({ error: "Email address already exists" });
        }
        const newUser = new User({ email, password });
        newUser.save((err, user) => {
            if (err) {
                return res.send(err)
            }
            console.log(this);
            this.sample1();
            const token = this.signToken(newUser);
            res.json({ token });
        })
    }

    public signToken = (user: IUser) => {
        return JWT.sign({
            iss: 'Freelancer',
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1) // current date tiem + 1 day,
        }, JWT_SECRET);
    }

    public sample(req, res) {
        console.log(this);
        this.sample1();
        res.send("hi");

    }

    public sample1() {
        console.log("hello");
    }
}