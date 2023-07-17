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
    constructor(public id: number, quality: InitCamelQuality) {
        if (quality === InitCamelQuality.None) {
            return;
        }

        const sprintSpeed: number = Math.ceil(Math.random() * 10 * (quality + 1));
        const agility: number = Math.ceil(Math.random() * 10 * (quality + 1));
        const stamina: number = Math.ceil(Math.random() * 10 * (quality + 1));

        this.agility.level = agility;
        this.sprintSpeed.level = sprintSpeed;
        this.stamina.level = stamina;
    }

    public colour: string = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

    public agility: CamelSkill = new CamelSkill('Agility');
    public sprintSpeed: CamelSkill = new CamelSkill('SprintSpeed');
    public stamina: CamelSkill = new CamelSkill('Stamina');

    public name = this.generateName();
    public temperament: CamelTemperament = this.generateTemperament();
    public unspentXp = 0;

    private generateName() {
        const adjectives = [
            "Sandy", "Dusty", "Golden", "Majestic", "Spotted",
            "Whirling", "Blazing", "Silent", "Radiant", "Breezy",
            "Amber", "Crimson", "Harmony", "Marble", "Opal",
            "Princess", "Sahara", "Shadow", "Tawny", "Whisper"
        ];

        const nouns = [
            "Desert", "Oasis", "Pyramid", "Mirage", "Nomad",
            "Sunset", "Sahara", "Dune", "Caravan", "Cactus",
            "Jewel", "Moon", "Oracle", "Sphinx", "Spirit",
            "Sultan", "Talisman", "Treasure", "Zephyr", "Zodiac"
        ];

        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

        return randomAdjective + " " + randomNoun;
    }

    private generateTemperament(): CamelTemperament {
        if (Math.random() < 0.25) {
            return CamelTemperament.Aggressive;
        } else if (Math.random() < 0.5) {
            return CamelTemperament.Temperamental;
        } else if (Math.random() < 0.75) {
            return CamelTemperament.Calm;
        } else {
            return CamelTemperament.Mild;
        }
    }
}