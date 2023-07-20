class DefaultLevelCurve implements LevelCurve {
    private readonly _minSkillLevel = 1;
    private readonly _maxSkillLevel = 99;

    public getXpRequiredForLevel(level: number) {
        return (level - 1) * 100;
    }

    public getLevelFromXp(xp: number) {
        return Math.min(this._maxSkillLevel, Math.floor(xp / 100) + 1);
    }
}