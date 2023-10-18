class CamelStable {
    constructor(
        private readonly _camelCreator: CamelCreator
    ) {
    }

    private _seedRadix = 36;
    private _camelInformationLength = 10;
    private _numberOfCamels = 25;

    public camels: Camel[] = [];

    public populateStable() {
        let firstTimeSetUp = false;
        if (!GameState.stableSeed) {
            firstTimeSetUp = true;
        }

        let index = 0;

        const variation = 20;
        const minimumLevel = 5;
        const maximumLevel = 100;
        const uniformCenters = Array.from(new Array(this._numberOfCamels), (e, i) => minimumLevel + ((maximumLevel - minimumLevel) / this._numberOfCamels) * (i));

        if (firstTimeSetUp) {
            uniformCenters.forEach(center => {

                const agility = this.generateRandomNumber(center, variation);
                const sprintSpeed = this.generateRandomNumber(center, variation);
                const stamina = this.generateRandomNumber(center, variation);
                const colour = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix;
                const name1 = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix;
                const name2 = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix;
                const temperament = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix; // unused

                const camel = this._camelCreator.createSeededCamel([
                    agility,
                    sprintSpeed,
                    stamina,
                    colour,
                    name1,
                    name2,
                    temperament
                ]);

                this.camels.push(camel);

                GameState.stableSeed += this._camelCreator.createSeedFromCamel(camel);
            });

            return;
        }

        const populateCamelArray = (camelArray: Camel[]) => {
            const seedPart = GameState.stableSeed.slice(index * this._camelInformationLength, (1 + index) * this._camelInformationLength);

            camelArray.push(
                this._camelCreator.createCamelFromSeed(seedPart)
            );

            index += 1;
        };

        new Array(this._numberOfCamels).fill(1).forEach(e => populateCamelArray(this.camels));

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

    private generateRandomNumber(center: number, plusMinusRange: number, min: number = 1, max: number = 100) {
        const randValue = center + ((Math.random()) * 2 - 1) * plusMinusRange;
        return Math.max(min, Math.min(max, randValue));
    }
}
