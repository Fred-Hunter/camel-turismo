import { CamelSkillType } from "./camel-skill-type";
export class CamelSkill {
    skillType;
    levelCurve;
    potential;
    constructor(skillType, levelCurve, potential, initialXp) {
        this.skillType = skillType;
        this.levelCurve = levelCurve;
        this.potential = potential;
        this.potential = Math.min(potential, levelCurve.maxSkillLevel);
        this.potential = Math.max(potential, levelCurve.minSkillLevel);
        this.addXp(initialXp);
    }
    currentXp = 0;
    get name() {
        switch (this.skillType) {
            case CamelSkillType.agility: return 'Agility';
            case CamelSkillType.sprintSpeed: return 'Sprint speed';
            case CamelSkillType.stamina: return 'Stamina';
        }
    }
    get level() {
        return this.levelCurve.getLevelFromXp(this.currentXp, this.potential);
    }
    getXpToNextLevel() {
        if (this.level === this.potential) {
            return 0;
        }
        return this.levelCurve.getXpRequiredForLevel(this.level + 1, this.potential) - this.currentXp;
    }
    addXp(value) {
        if (value < 0) {
            throw Error('Cannot add negative xp');
        }
        this.currentXp += value;
    }
}
