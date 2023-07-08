enum InitCamelQuality {
    Low = 0,
    Medium = 1,
    High = 2,
    Cpu1 = 3,
    Cpu2 = 4,
    Cpu3 = 5,
    Cpu4 = 6,
    Cpu5 = 7
}

class Camel {
    constructor(public id: number, quality: InitCamelQuality) {
        let sprintSpeed: number = Math.ceil(Math.random() * 10 * (quality + 1));
        let agility: number = Math.ceil(Math.random() * 10 * (quality + 1));
        let stamina: number = Math.ceil(Math.random() * 10 * (quality + 1));
        
        this.camelSkills = new CamelSkillsBuilder()
            .withSprintSpeed(sprintSpeed)
            .withAgility(agility)
            .withStamina(stamina)
            .build();
    }
    
    color: string = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
    
    public camelSkills: CamelSkills;
}