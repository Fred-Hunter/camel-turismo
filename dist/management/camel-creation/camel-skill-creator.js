import { CamelSkill } from "../skills/camel-skill.js";
export class CamelSkillCreator {
    _levelCurveFactory;
    constructor(_levelCurveFactory) {
        this._levelCurveFactory = _levelCurveFactory;
    }
    generateSkillWithQuality(skillType, quality) {
        const level = Math.ceil(Math.random() * 10 * (quality + 1));
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        const potentialRange = levelCurve.maxSkillLevel - level;
        const potential = level + Math.floor(Math.random() * potentialRange);
        const initialXp = levelCurve.getXpRequiredForLevel(level, potential);
        return new CamelSkill(skillType, levelCurve, potential, initialXp);
    }
    generateSkillFromSerialisedSkill(serialisedSkill) {
        const xp = serialisedSkill.currentXp;
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        return new CamelSkill(serialisedSkill.skillType, levelCurve, serialisedSkill.potential, xp);
    }
    generateSkillWithLevel(skillType, level) {
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        return new CamelSkill(skillType, levelCurve, level, levelCurve.getXpRequiredForLevel(level, level));
    }
}
