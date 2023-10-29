import { Camel } from "../camel-creation/camel.js";
import { CamelSkill } from "./camel-skill.js";

export class CamelSkillQueries {
    public getSkills(camel: Camel): CamelSkill[] {
        return [camel.agility, camel.sprintSpeed, camel.stamina];
    }
}
