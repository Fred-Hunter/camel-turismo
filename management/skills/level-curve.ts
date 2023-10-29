export interface LevelCurve {
    getXpRequiredForLevel(level: number, potential: number): number;

    getLevelFromXp(xp: number, potential: number): number;

    get minSkillLevel(): number;
    
    get maxSkillLevel(): number;
}
