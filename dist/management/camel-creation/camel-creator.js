import { GameState } from "../../global/game-state.js";
import { CamelSkillType } from "../skills/camel-skill-type.js";
import { Camel } from "./camel.js";
export class CamelCreator {
    _camelPropertyGenerator;
    _camelSkillCreator;
    constructor(_camelPropertyGenerator, _camelSkillCreator) {
        this._camelPropertyGenerator = _camelPropertyGenerator;
        this._camelSkillCreator = _camelSkillCreator;
    }
    createRandomCamelWithQuality(quality) {
        const agility = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.agility, quality);
        const sprintSpeed = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.sprintSpeed, quality);
        const stamina = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.stamina, quality);
        const intimidation = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.intimidation, quality);
        const confidence = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.confidence, quality);
        const camelInitProperties = {
            colour: this._camelPropertyGenerator.generateColour(),
            name: this._camelPropertyGenerator.generateName(),
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
                intimidation: intimidation,
                confidence: confidence,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        };
        const camel = new Camel(++GameState.lastUsedId, camelInitProperties);
        return camel;
    }
    createCamel(agilityLevel, sprintSpeedLevel, staminaLevel, intimidationLevel, confidenceLevel, name) {
        const agility = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.agility, agilityLevel);
        const sprintSpeed = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.sprintSpeed, sprintSpeedLevel);
        const stamina = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.stamina, staminaLevel);
        const intimidation = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.intimidation, intimidationLevel);
        const confidence = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.confidence, confidenceLevel);
        const camelInitProperties = {
            colour: this._camelPropertyGenerator.generateColour(),
            name: name,
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
                intimidation: intimidation,
                confidence: confidence,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        };
        return new Camel(++GameState.lastUsedId, camelInitProperties);
    }
    createCamelFromSerialisedCamel(serialisedCamel) {
        const camelInitProperties = {
            colour: serialisedCamel.colour,
            name: serialisedCamel.name,
            skills: {
                agility: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.agility),
                sprintSpeed: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.sprintSpeed),
                stamina: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.stamina),
                intimidation: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.intimidation),
                confidence: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.confidence),
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: serialisedCamel.unspentXp,
            achievementsUnlocked: serialisedCamel.achievementsUnlocked,
        };
        return new Camel(serialisedCamel.id, camelInitProperties);
    }
    createSeededCamel(seeds) {
        const agility = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.agility, Math.ceil(seeds[0]));
        const sprintSpeed = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.sprintSpeed, Math.ceil(seeds[1]));
        const stamina = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.stamina, Math.ceil(seeds[2]));
        const intimidation = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.sprintSpeed, Math.ceil(seeds[3]));
        const confidence = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.stamina, Math.ceil(seeds[4]));
        const camelInitProperties = {
            colour: this._camelPropertyGenerator.generateSeededColour(seeds[5]),
            name: this._camelPropertyGenerator.generateSeededName(seeds[6]),
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
                intimidation: intimidation,
                confidence: confidence,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        };
        return new Camel(++GameState.lastUsedId, camelInitProperties);
    }
    createCamelFromSeed(seedPart, radix = 36) {
        return this.createSeededCamel([
            parseInt(seedPart.slice(0, 2), radix),
            parseInt(seedPart.slice(2, 4), radix),
            parseInt(seedPart.slice(4, 6), radix),
            parseInt(seedPart.slice(6, 8), radix),
            parseInt(seedPart.slice(8, 10), radix),
            parseInt(seedPart.slice(10, 11), radix) / radix,
            seedPart.slice(11, 13),
            parseInt(seedPart.slice(13, 14), radix) / radix,
        ]);
    }
    createSeedFromCamel(camel) {
        const radix = 36;
        let encodedString = "";
        // skills
        encodedString += camel.agility.level.toString(radix).padStart(2, "0");
        encodedString += camel.sprintSpeed.level.toString(radix).padStart(2, "0");
        encodedString += camel.stamina.level.toString(radix).padStart(2, "0");
        encodedString += camel.intimidation.level.toString(radix).padStart(2, "0");
        encodedString += camel.confidence.level.toString(radix).padStart(2, "0");
        // colour
        encodedString += Math.round(parseInt(camel.colour.substring(1, 7), 16) / (16 ** 6 / radix)).toString(radix);
        // name
        encodedString += this._camelPropertyGenerator.generateSeedFromName(camel.name, radix);
        // temperament
        encodedString += "0"; // unused
        return encodedString;
    }
}
