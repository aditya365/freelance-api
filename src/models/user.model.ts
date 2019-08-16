import mongoose, { Schema, Document } from "mongoose";

// type
export interface IUser extends Document {
    email: string;
    password: string;
}

// create schema
const userSchema: Schema = new Schema({
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

// create and export model
export default mongoose.model<IUser>("User", userSchema);