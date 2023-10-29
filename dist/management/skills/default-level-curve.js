export class DefaultLevelCurve {
    get minSkillLevel() { return 1; }
    get maxSkillLevel() { return 99; }
    getXpRequiredForLevel(level, potential = 0) {
        return (level - 1) * 100;
    }
    getLevelFromXp(xp, potential) {
        return Math.min(potential, Math.floor(xp / 100) + 1);
    }
}
