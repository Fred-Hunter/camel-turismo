import { CamelSkillType } from "./camel-skill-type";
import { LevelCurve } from "./level-curve";

export class CamelSkill {
    constructor(
        public readonly skillType: CamelSkillType,
        public readonly levelCurve: LevelCurve,
        public readonly potential: number,
        initialXp: number,
    ) {
        this.potential = Math.min(potential, levelCurve.maxSkillLevel);
        this.potential = Math.max(potential, levelCurve.minSkillLevel);
        this.addXp(initialXp);
    }
    
    public currentXp = 0;

    public get name(): string {
        switch (this.skillType) {
            case CamelSkillType.agility: return 'Agility';
            case CamelSkillType.sprintSpeed: return 'Sprint speed';
            case CamelSkillType.stamina: return 'Stamina';
        }
    }

    public get level(): number {
        return this.levelCurve.getLevelFromXp(this.currentXp, this.potential);
    }

    public getXpToNextLevel(): number {
        if (this.level === this.potential) {
            return 0;
        }

        return this.levelCurve.getXpRequiredForLevel(this.level + 1, this.potential) - this.currentXp;
    }

    public addXp(value: number) {
        if (value < 0) {
            throw Error('Cannot add negative xp');
        }

        this.currentXp += value;
    }

    // public set level(level: number) {
    //     let flooredLevel = Math.floor(level);

    //     flooredLevel = Math.max(level, this._minSkillLevel);
    //     flooredLevel = Math.min(level, this._maxSkillLevel);

    //     this.currentXp = this.getXpRequiredForLevel(flooredLevel);
    // }
}
