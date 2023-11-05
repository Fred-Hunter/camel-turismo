export var InitCamelQuality;
(function (InitCamelQuality) {
    InitCamelQuality[InitCamelQuality["None"] = 0] = "None";
    InitCamelQuality[InitCamelQuality["Low"] = 1] = "Low";
    InitCamelQuality[InitCamelQuality["Medium"] = 2] = "Medium";
    InitCamelQuality[InitCamelQuality["High"] = 3] = "High";
    InitCamelQuality[InitCamelQuality["Cpu1"] = 4] = "Cpu1";
    InitCamelQuality[InitCamelQuality["Cpu2"] = 5] = "Cpu2";
    InitCamelQuality[InitCamelQuality["Cpu3"] = 6] = "Cpu3";
    InitCamelQuality[InitCamelQuality["Cpu4"] = 7] = "Cpu4";
    InitCamelQuality[InitCamelQuality["Cpu5"] = 8] = "Cpu5";
})(InitCamelQuality || (InitCamelQuality = {}));
export class Camel {
    id;
    constructor(id, camelInitProperties) {
        this.id = id;
        this.colour = camelInitProperties.colour;
        this.name = camelInitProperties.name;
        this.temperament = camelInitProperties.temperament;
        this.unspentXp = camelInitProperties.unspentXp;
        this.achievementsUnlocked = camelInitProperties.achievementsUnlocked;
        this.agility = camelInitProperties.skills.agility;
        this.sprintSpeed = camelInitProperties.skills.sprintSpeed;
        this.stamina = camelInitProperties.skills.stamina;
        this.intimidation = camelInitProperties.skills.intimidation;
        this.confidence = camelInitProperties.skills.confidence;
    }
    colour;
    name;
    temperament;
    unspentXp;
    agility;
    sprintSpeed;
    stamina;
    intimidation;
    confidence;
    location = 0;
    age = 0;
    achievementsUnlocked = 0;
    get level() {
        const skillLevels = [
            this.agility.level,
            this.sprintSpeed.level,
            this.stamina.level
        ];
        const skillLevelSum = skillLevels.reduce((partialSum, newValue) => partialSum + newValue, 0);
        return Math.floor(skillLevelSum / skillLevels.length);
    }
    get potentialLevel() {
        const potentialSkillLevels = [
            this.agility.potential,
            this.sprintSpeed.potential,
            this.stamina.potential
        ];
        const skillLevelSum = potentialSkillLevels.reduce((partialSum, newValue) => partialSum + newValue, 0);
        return Math.floor(skillLevelSum / potentialSkillLevels.length);
    }
    get potentialDescription() {
        const potentialLevel = this.potentialLevel;
        if (potentialLevel <= 10)
            return 'Dismal underachiever';
        else if (potentialLevel <= 20)
            return 'Dismal underachiever';
        else if (potentialLevel <= 30)
            return 'Struggling competitor';
        else if (potentialLevel <= 40)
            return 'Modest hopeless case';
        else if (potentialLevel <= 50)
            return 'Developing talent';
        else if (potentialLevel <= 60)
            return 'Breakthrough prospect';
        else if (potentialLevel <= 70)
            return 'Frontrunner in training';
        else if (potentialLevel <= 80)
            return 'Elite championship aspirant';
        else if (potentialLevel <= 90)
            return 'Future racing star';
        else
            return 'Legendary camel in the making';
    }
    get levelAverage() {
        return (this.agility.level +
            this.sprintSpeed.level +
            this.stamina.level +
            this.confidence.level +
            this.intimidation.level) / 3;
    }
}
