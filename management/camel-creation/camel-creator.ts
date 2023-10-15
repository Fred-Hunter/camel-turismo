class CamelCreator {
    constructor(
        private readonly _camelPropertyGenerator: CamelPropertyGenerator,
        private readonly _camelSkillCreator: CamelSkillCreator
        ) { }

    public createRandomCamelWithQuality(
        quality: InitCamelQuality
    ): Camel {
        const agility = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.agility, quality);
        const sprintSpeed = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.sprintSpeed, quality);
        const stamina = this._camelSkillCreator.generateSkillWithQuality(CamelSkillType.stamina, quality);

        const camelInitProperties: CamelInitProperties = {
            colour: this._camelPropertyGenerator.generateColour(),
            name: this._camelPropertyGenerator.generateName(),
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        }

        const camel = new Camel(++GameState.lastUsedId, camelInitProperties);

        return camel;
    }

    public createCamel(
        agilityLevel: number,
        sprintSpeedLevel: number,
        staminaLevel: number,
    ): Camel {
        const agility = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.agility, agilityLevel);
        const sprintSpeed = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.sprintSpeed, sprintSpeedLevel);
        const stamina = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.stamina, staminaLevel);

        const camelInitProperties: CamelInitProperties = {
            colour: this._camelPropertyGenerator.generateColour(),
            name: this._camelPropertyGenerator.generateName(),
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        }

        return new Camel(++GameState.lastUsedId, camelInitProperties);
    }

    public createCamelFromSerialisedCamel(serialisedCamel: Camel): Camel {
        const camelInitProperties: CamelInitProperties = {
            colour: serialisedCamel.colour,
            name: serialisedCamel.name,
            skills: {
                agility: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.agility),
                sprintSpeed: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.sprintSpeed),
                stamina: this._camelSkillCreator.generateSkillFromSerialisedSkill(serialisedCamel.stamina),
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: serialisedCamel.unspentXp,
            achievementsUnlocked: serialisedCamel.achievementsUnlocked,
        }

        return new Camel(serialisedCamel.id, camelInitProperties);
    }

    
    public createSeededCamel(
        seeds: [number, number, number, number, number, number, number]
    ): Camel {
        const agility = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.agility, Math.ceil(seeds[0]));
        const sprintSpeed = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.sprintSpeed, Math.ceil(seeds[1]));
        const stamina = this._camelSkillCreator.generateSkillWithLevel(CamelSkillType.stamina, Math.ceil(seeds[2]));

        const camelInitProperties: CamelInitProperties = {
            colour: this._camelPropertyGenerator.generateSeededColour(seeds[3]),
            name: this._camelPropertyGenerator.generateSeededName(seeds[4], seeds[5]),
            skills: {
                agility: agility,
                sprintSpeed: sprintSpeed,
                stamina: stamina,
            },
            temperament: this._camelPropertyGenerator.generateTemperament(),
            unspentXp: 0,
            achievementsUnlocked: 0,
        }

        return new Camel(++GameState.lastUsedId, camelInitProperties);
    }

    

    public createSeedFromCamel(camel: Camel): string {
        const radix = 36;
        let encodedString = "";

        // skills
        encodedString += camel.agility.level.toString(radix).padStart(2,"0");
        encodedString += camel.sprintSpeed.level.toString(radix).padStart(2,"0");
        encodedString += camel.stamina.level.toString(radix).padStart(2,"0");

        // colour
        encodedString += Math.round(parseInt(camel.colour.substring(1,7), 16) / (16**6 / 36)).toString(36);

        // name
        encodedString += this._camelPropertyGenerator.generateSeedFromName(camel.name);
        
        return encodedString;
    }
}
