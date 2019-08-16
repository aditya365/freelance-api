import * as mongoose from "mongoose";
const schema = mongoose.Schema;

// create schema
const skillSchema = new schema({
    name: {
        type: String,
        required: "Skill name is required"
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

//create and export the model
export const Skill = mongoose.model('Skill', skillSchema);
