import { SkillController } from "../controllers/skill.controller";

export class SkillRoutes {
    public skillController: SkillController = new SkillController();
    public routes(app: any): void {
        app.route('/skills')
            .get(this.skillController.getSkills)
            .post(this.skillController.createSkill);

        app.route('/skills/:id')
            .get(this.skillController.getSkill)
            .put(this.skillController.updateSkill)
            .delete(this.skillController.deleteSkill)
    }

}

