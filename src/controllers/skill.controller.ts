import * as mongoose from "mongoose";
import { Skill } from "../models/skill.model";
import { Response, Request } from "express";

export class SkillController {
    constructor() {
    }

    // gets all skills
    public getSkills(req: Request, res: Response) {
        Skill.find({}, (err, skills) => {
            if (err) {
                res.send(err);
            }
            res.json(skills);
        })
    };

    //gets skill by provided Id
    public getSkill(req: Request, res: Response) {
        Skill.findById(req.params.id, (err, skill) => {
            if (err) {
                return res.send(err);
            }
            return res.json(skill);
        })
    }

    //creates a skill
    public createSkill(req: Request, res: Response) {
        const newSkill = new Skill(req.body);
        newSkill.save((err, skill) => {
            if (err) {
                res.send(err);
            }
            res.json(skill);
        })
    }

    // updates a skill based on provided id and the new skill
    public updateSkill(req: Request, res: Response) {
        const newSkill = req.body;
        newSkill.updatedDate = Date.now();
        Skill.findByIdAndUpdate(req.params.id, newSkill, { new: true }, (err, skill) => {
            if (err) {
                res.send(err)
            }
            res.json(skill);
        })
    }

    //deletes a skill by id
    public deleteSkill(req: Request, res: Response) {
        Skill.deleteOne({ _id: req.params.id }, (err) => {
            if (err) {
                res.send(err)
            }
            res.status(204);
            res.send({ message: "Succesfully deleted" });
        })
    }
}