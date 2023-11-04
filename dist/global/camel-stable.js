import { GameState } from "./game-state.js";
export class CamelStable {
    _camelCreator;
    _camelPropertyGenerator;
    constructor(_camelCreator, _camelPropertyGenerator) {
        this._camelCreator = _camelCreator;
        this._camelPropertyGenerator = _camelPropertyGenerator;
    }
    _seedRadix = 36;
    _numberOfCamels = 25;
    camelInformationLength = 14;
    camels = [];
    populateStable() {
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
        const populateCamelArray = (camelArray) => {
            const seedPart = GameState.stableSeed.slice(index * this.camelInformationLength, (1 + index) * this.camelInformationLength);
            camelArray.push(this._camelCreator.createCamelFromSeed(seedPart));
            index += 1;
        };
        this.camels = [];
        new Array(this._numberOfCamels).fill(1).forEach(e => populateCamelArray(this.camels));
        return;
    }
    generateSeed(length = 700, radix = 36) {
        return "x".repeat(length).replace(/x/g, (char) => Math.floor(Math.random() * radix).toString(radix));
    }
    generateRandomNumber(center, plusMinusRange, min = 1, max = 100) {
        const randValue = center + ((Math.random()) * 2 - 1) * plusMinusRange;
        return Math.max(min, Math.min(max, randValue));
    }
}
