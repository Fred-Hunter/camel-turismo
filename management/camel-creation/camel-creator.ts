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
        }

        const camel = new Camel(++GameState.lastUsedId, camelInitProperties);

        return camel;
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
        }

        return new Camel(serialisedCamel.id, camelInitProperties);
    }
}