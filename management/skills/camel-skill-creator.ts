class CamelSkillCreator {
    constructor(private readonly _levelCurveFactory: LevelCurveFactory) {}

    public generateSkillWithQuality(
        skillType: CamelSkillType,
        quality: InitCamelQuality
    ): CamelSkill {
        const level: number = Math.ceil(Math.random() * 10 * (quality + 1));
        const potential = level + 10;

        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        const initialXp = levelCurve.getXpRequiredForLevel(level, potential);

        return new CamelSkill(skillType, levelCurve, potential, initialXp);
    }

    public generateSkillFromSerialisedSkill(serialisedSkill: CamelSkill): CamelSkill {
        const xp = serialisedSkill.currentXp;
        const levelCurve = this._levelCurveFactory.getDefaultLevelCurve();
        
        return new CamelSkill(serialisedSkill.skillType, levelCurve, serialisedSkill.potential, xp);
    }
}