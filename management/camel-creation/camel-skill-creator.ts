class CamelSkillCreator {
    constructor(private readonly _levelCurveFactory: LevelCurveFactory) {}

    public generateSkillWithQuality(
        skillType: CamelSkillType,
        quality: InitCamelQuality
    ): CamelSkill {
        const level: number = Math.ceil(Math.random() * 10 * (quality + 1));
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        
        const potentialRange = levelCurve.maxSkillLevel - level;
        const potential = level + Math.floor(Math.random() * potentialRange);
        const initialXp = levelCurve.getXpRequiredForLevel(level, potential);

        return new CamelSkill(skillType, levelCurve, potential, initialXp);
    }

    public generateSkillFromSerialisedSkill(serialisedSkill: CamelSkill): CamelSkill {
        const xp = serialisedSkill.currentXp;
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        
        return new CamelSkill(serialisedSkill.skillType, levelCurve, serialisedSkill.potential, xp);
    }
}