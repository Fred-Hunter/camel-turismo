import { StatisticsHelper } from "../../statistics/statistics-helper.js";
export class CamelSkillCommands {
    levelUpSkill(camel, skill) {
        const toNextLevel = skill.getXpToNextLevel();
        if (camel.unspentXp >= toNextLevel) {
            skill.addXp(toNextLevel);
            camel.unspentXp -= toNextLevel;
            StatisticsHelper.LogExpChange(-toNextLevel);
        }
    }
}
