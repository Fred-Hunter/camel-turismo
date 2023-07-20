enum InitCamelQuality {
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

class Camel {
    constructor(
        public id: number,
        camelInitProperties: CamelInitProperties
    ) {
        this.colour = camelInitProperties.colour;
        this.name = camelInitProperties.name;
        this.temperament = camelInitProperties.temperament
        this.unspentXp = camelInitProperties.unspentXp;
        this.agility = camelInitProperties.skills.agility;
        this.sprintSpeed = camelInitProperties.skills.sprintSpeed;
        this.stamina = camelInitProperties.skills.sprintSpeed;
    }

    public colour: string;
    public name: string;
    public temperament: CamelTemperament;
    public unspentXp: number;

    public agility: CamelSkill;
    public sprintSpeed: CamelSkill;
    public stamina: CamelSkill;
}