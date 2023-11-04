import { Camel } from "../management/camel-creation/camel.js";
import { CamelCreator } from "../management/camel-creation/camel-creator.js";
import { GameState } from "./game-state.js";
import { CamelPropertyGenerator } from "../management/camel-creation/camel-property-generator.js";

export class CamelStable {

    constructor(
        private readonly _camelCreator: CamelCreator,
        private readonly _camelPropertyGenerator: CamelPropertyGenerator
    ) {
    }

    private _seedRadix = 36;
    private _numberOfCamels = 25;

    public camelInformationLength = 14;
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
                const intimidation = this.generateRandomNumber(center, variation);
                const confidence = this.generateRandomNumber(center, variation);

                const colour = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix;
                const nameSeed = this._camelPropertyGenerator.generateNameSeed(this._seedRadix);
                const temperament = parseInt(this.generateSeed(1), this._seedRadix) / this._seedRadix; // unused

                const camel = this._camelCreator.createSeededCamel([
                    agility,
                    sprintSpeed,
                    stamina,
                    intimidation,
                    confidence,
                    colour,
                    nameSeed,
                    temperament
                ]);

                this.camels.push(camel);

                GameState.stableSeed += this._camelCreator.createSeedFromCamel(camel);
            });

            return;
        }

        const populateCamelArray = (camelArray: Camel[]) => {
            const seedPart = GameState.stableSeed.slice(index * this.camelInformationLength, (1 + index) * this.camelInformationLength);

            camelArray.push(
                this._camelCreator.createCamelFromSeed(seedPart)
            );

            index += 1;
        };
        
        this.camels = [];
        new Array(this._numberOfCamels).fill(1).forEach(e => populateCamelArray(this.camels));

        return;
    }

    private generateSeed(length: number = 700, radix: number = 36): string {
        return "x".repeat(length).replace(/x/g, (char) =>
            Math.floor(Math.random() * radix).toString(radix));
    }

    private generateRandomNumber(center: number, plusMinusRange: number, min: number = 1, max: number = 100) {
        const randValue = center + ((Math.random()) * 2 - 1) * plusMinusRange;
        return Math.max(min, Math.min(max, randValue));
    }
}
