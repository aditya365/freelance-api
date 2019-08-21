import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
// type
export interface IUser extends Document {
    email: string;
    password: string;
}

export interface IUserModel extends IUser {
    isValidPassword(password: string): boolean;
}

// create schema
export const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: "Password is required"
    }
})

//to hash the password
userSchema.pre<IUser>('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//to validate user password
userSchema.methods.isvalidPassword = async (password: string) => {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

// create and export model
export default mongoose.model<IUserModel>("User", userSchema);