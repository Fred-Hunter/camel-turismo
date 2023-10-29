import { Camel } from "../camel-creation/camel";
import { CamelSkill } from "./camel-skill";

export class CamelSkillCommands {
    public levelUpSkill(camel: Camel, skill: CamelSkill) {
        const toNextLevel = skill.getXpToNextLevel();

        if (camel.unspentXp >= toNextLevel) {
            skill.addXp(toNextLevel);
            camel.unspentXp -= toNextLevel;
        }
    }
}
