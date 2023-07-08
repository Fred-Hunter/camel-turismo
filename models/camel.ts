enum InitCamelQuality {
    Low = 0,
    Medium = 1,
    High = 2
}

class Camel {
    constructor(public id: number, quality: InitCamelQuality) {
        let sprintSpeed: number = Math.ceil(Math.random() * 10 * (quality + 1));
        
        this.camelSkills = new CamelSkillsBuilder()
            .withSprintSpeed(sprintSpeed)
            .build();
    }
    
    public camelSkills: CamelSkills;
}