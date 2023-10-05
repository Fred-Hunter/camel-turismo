class CamelStable {
    constructor(
        private readonly _camelCreator: CamelCreator
        ) {
    }

    public populateStable() {
        if (!GameState.stableSeed) {
            GameState.stableSeed = this.generateSeed();
        }

        const seed = GameState.stableSeed;
        const camelInformationLength = 10;
        
        let index = 0;
        let easyCamelCount = 10;
        let mediumCamelCount = 10;
        let hardCamelCount = 10;
        
        let easyCamels: Camel[] = [];
        let mediumCamels: Camel[] = [];
        let hardCamels: Camel[] = [];

        const populateCamelArray = (quality: InitCamelQuality, camelArray: Camel[]) => {
            const radix = 36
            const seedPart = seed.slice(index * camelInformationLength, (1 + index) * camelInformationLength);

            camelArray.push(
                this._camelCreator.createSeededCamel([
                    ((quality + 1) / 10) * parseInt(seedPart.slice(0,2), radix) / (radix ** 2),
                    ((quality + 1) / 10) * parseInt(seedPart.slice(2,4), radix) / (radix ** 2),
                    ((quality + 1) / 10) * parseInt(seedPart.slice(4,6), radix) / (radix ** 2),
                    parseInt(seedPart.slice(6,7), radix) / radix,
                    parseInt(seedPart.slice(7,8), radix) / radix,
                    parseInt(seedPart.slice(8,9), radix) / radix,
                    parseInt(seedPart.slice(8,9), radix) / radix,
                ])
            );

            index += camelInformationLength;
        };

        new Array(easyCamelCount).fill(InitCamelQuality.High).forEach(quality => populateCamelArray(quality, easyCamels));
        new Array(mediumCamelCount).fill(InitCamelQuality.Cpu1).forEach(quality => populateCamelArray(quality, mediumCamels));
        new Array(hardCamelCount).fill(InitCamelQuality.Cpu5).forEach(quality => populateCamelArray(quality, hardCamels));
    }

    public static GetGeneralWaste: () => Camel = () => {
        const levelCurve = new DefaultLevelCurve();
        return new Camel(++GameState.lastUsedId, {
            colour: "#fff",
            name: "General Waste",
            skills: {
                agility: new CamelSkill(CamelSkillType.agility, levelCurve, 0, levelCurve.getXpRequiredForLevel(2)),
                sprintSpeed: new CamelSkill(CamelSkillType.sprintSpeed, levelCurve, 0, levelCurve.getXpRequiredForLevel(50)),
                stamina: new CamelSkill(CamelSkillType.stamina, levelCurve, 0, levelCurve.getXpRequiredForLevel(50)),
            },
            temperament: CamelTemperament.Calm,
            unspentXp: 0,
            achievementsUnlocked: 0,
        });
    };

    private generateSeed(length: number = 700, radix: number = 36): string {
        return "x".repeat(length).replace(/x/g, (char) => 
            Math.floor(Math.random() * radix).toString(radix));  
    }
}
