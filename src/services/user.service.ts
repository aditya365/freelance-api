import User, { IUser } from "../models/user.model";
import { Service } from "typedi";

@Service()
export class UserService {
    public async create(user: IUser): Promise<IUser> {
        let existingUser = await this.findByEmail(user.email);
        if (existingUser == null) {
            const newUser = new User(user);
            return newUser.save();
        } else {
            return null;
        }
    }

    public async findByEmail(email: string) : Promise<IUser> {
        return await User.findOne({ email });
    }
}