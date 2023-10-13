class CamelStable {
    constructor(
        private readonly _camelCreator: CamelCreator
    ) {
    }

    private _seedRadix = 36;
    private _camelInformationLength = 10;
    private _numberOfCamels = 25;

    public populateStable() {
        let firstTimeSetUp = false;
        if (!GameState.stableSeed) {
            GameState.stableSeed = this.generateSeed();
            firstTimeSetUp = true;
        }

        const seed = GameState.stableSeed;

        let index = 0;
        let camels: Camel[] = [];

        const variation = 30;
        const uniformCenters = Array.from(new Array(this._numberOfCamels), (e, i) => (100 / this._numberOfCamels) * (i + 1));

        if (firstTimeSetUp) {
            uniformCenters.forEach(center => {
                camels.push(
                    this._camelCreator.createSeededCamel([
                        this.generateRandomNumber(center, variation),
                        this.generateRandomNumber(center, variation),
                        this.generateRandomNumber(center, variation),
                        parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix,
                        parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix,
                        parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix,
                        parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix,
                    ])
                );
            });

            return;
        }

        const populateCamelArray = (camelArray: Camel[]) => {
            const radix = 36
            const seedPart = seed.slice(index * this._camelInformationLength, (1 + index) * this._camelInformationLength);
            const maxLevel = (new DefaultLevelCurve()).maxSkillLevel;

            camelArray.push(
                this._camelCreator.createSeededCamel([
                    maxLevel * parseInt(seedPart.slice(0, 2), radix) / (radix ** 2),
                    maxLevel * parseInt(seedPart.slice(2, 4), radix) / (radix ** 2),
                    maxLevel * parseInt(seedPart.slice(4, 6), radix) / (radix ** 2),
                    parseInt(seedPart.slice(6, 7), radix) / radix,
                    parseInt(seedPart.slice(7, 8), radix) / radix,
                    parseInt(seedPart.slice(8, 9), radix) / radix,
                    parseInt(seedPart.slice(9, 10), radix) / radix,
                ])
            );

            index += this._camelInformationLength;
        };

        new Array(this._numberOfCamels).forEach(quality => populateCamelArray(camels));

        return;
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

    private generateRandomNumber(center: number, plusMinusRange: number, max: number = 100, min: number = 0) {
        const randValue = center + ((Math.random()) * 2 - 1) * plusMinusRange;
        return Math.max(min, Math.min(max, randValue));
    }
}
