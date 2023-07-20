class DefaultLevelCurve implements LevelCurve {
    public get minSkillLevel() { return 1; }

    public get maxSkillLevel() { return 99; }

    public getXpRequiredForLevel(level: number, potential: number) {
        return (level - 1) * 100;
    }

    public getLevelFromXp(xp: number, potential: number) {
        return Math.min(potential, Math.floor(xp / 100) + 1);
    }
}