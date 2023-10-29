import { Camel } from "../camel-creation/camel";
import { CamelSkill } from "./camel-skill";

export class CamelSkillQueries {
    public getSkills(camel: Camel): CamelSkill[] {
        return [camel.agility, camel.sprintSpeed, camel.stamina];
    }
}
