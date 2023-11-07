import { CamelSkill } from "../skills/camel-skill.js";
import { CamelInitProperties } from "./camel-init-properties.js";
import { CamelTemperament } from "./camel-temperament.js";

export enum InitCamelQuality {
    None = 0,
    Low,
    Medium,
    High,
    Cpu1,
    Cpu2,
    Cpu3,
    Cpu4,
    Cpu5
}

export class Camel {
    constructor(
        public id: number,
        camelInitProperties: CamelInitProperties
    ) {
        this.colour = camelInitProperties.colour;
        this.name = camelInitProperties.name;
        this.temperament = camelInitProperties.temperament
        this.achievementsUnlocked = camelInitProperties.achievementsUnlocked;
        
        // This unspent exp should already be logged
        this.unspentXp = camelInitProperties.unspentXp;

        this.agility = camelInitProperties.skills.agility;
        this.sprintSpeed = camelInitProperties.skills.sprintSpeed;
        this.stamina = camelInitProperties.skills.stamina;
        this.intimidation = camelInitProperties.skills.intimidation;
        this.confidence = camelInitProperties.skills.confidence;
    }

    public colour: string;
    public name: string;
    public temperament: CamelTemperament;
    public unspentXp: number;

    public agility: CamelSkill;
    public sprintSpeed: CamelSkill;
    public stamina: CamelSkill;
    public intimidation: CamelSkill;
    public confidence: CamelSkill;

    public location: number = 0;
    public age: number = 0;
    public achievementsUnlocked: number = 0;

    public get level(): number {
        const skillLevels = [
            this.agility.level,
            this.sprintSpeed.level,
            this.stamina.level];

        const skillLevelSum = skillLevels.reduce((partialSum, newValue) => partialSum + newValue, 0);

        return Math.floor(skillLevelSum / skillLevels.length);
    }

    public get potentialLevel(): number {
        const potentialSkillLevels = [
            this.agility.potential,
            this.sprintSpeed.potential,
            this.stamina.potential];

        const skillLevelSum = potentialSkillLevels.reduce((partialSum, newValue) => partialSum + newValue, 0);

        return Math.floor(skillLevelSum / potentialSkillLevels.length);
    }

    public get potentialDescription(): string {
        const potentialLevel = this.potentialLevel;

        if (potentialLevel <= 10) return 'Dismal underachiever';
        else if (potentialLevel <= 20) return 'Dismal underachiever';
        else if (potentialLevel <= 30) return 'Struggling competitor';
        else if (potentialLevel <= 40) return 'Modest hopeless case';
        else if (potentialLevel <= 50) return 'Developing talent';
        else if (potentialLevel <= 60) return 'Breakthrough prospect';
        else if (potentialLevel <= 70) return 'Frontrunner in training';
        else if (potentialLevel <= 80) return 'Elite championship aspirant';
        else if (potentialLevel <= 90) return 'Future racing star';
        else return 'Legendary camel in the making'
    }

    public get levelAverage(): number {
        return (this.agility.level +
            this.sprintSpeed.level +
            this.stamina.level +
            this.confidence.level +
            this.intimidation.level) / 5;
    }
}
