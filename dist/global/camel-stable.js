import { Camel } from "../management/camel-creation/camel";
import { CamelTemperament } from "../management/camel-creation/camel-temperament";
import { CamelSkill } from "../management/skills/camel-skill";
import { CamelSkillType } from "../management/skills/camel-skill-type";
import { DefaultLevelCurve } from "../management/skills/default-level-curve";
import { GameState } from "./game-state";
export class CamelStable {
    _camelCreator;
    constructor(_camelCreator) {
        this._camelCreator = _camelCreator;
    }
    _seedRadix = 36;
    _camelInformationLength = 10;
    _numberOfCamels = 25;
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
        const populateCamelArray = (camelArray) => {
            const seedPart = GameState.stableSeed.slice(index * this._camelInformationLength, (1 + index) * this._camelInformationLength);
            camelArray.push(this._camelCreator.createCamelFromSeed(seedPart));
            index += 1;
        };
        this.camels = [];
        new Array(this._numberOfCamels).fill(1).forEach(e => populateCamelArray(this.camels));
        return;
    }
    static GetGeneralWaste = () => {
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
    generateSeed(length = 700, radix = 36) {
        return "x".repeat(length).replace(/x/g, (char) => Math.floor(Math.random() * radix).toString(radix));
    }
    generateRandomNumber(center, plusMinusRange, min = 1, max = 100) {
        const randValue = center + ((Math.random()) * 2 - 1) * plusMinusRange;
        return Math.max(min, Math.min(max, randValue));
    }
}
