class CamelSkill {
    constructor(
        private readonly _name: string) 
    {
        const xp = this.getXpRequiredForVirtualLevel(1);
        this._currentXp = xp;
    }

    private readonly _minSkillLevel = 1;
    private readonly _maxSkillLevel = 99;
    private _currentXp = 0;

    public get name() {
        return this._name;
    }

    private getXpRequiredForVirtualLevel(level: number) {
        return (level - 1) * 100;
    }

    private getVirtualLevelWithXp(xp: number) {
        return Math.floor(xp / 100) + 1;
    }

    public setLevel(value: number) {
        this._currentXp = this.getXpRequiredForVirtualLevel(value);
    }
    
    public get level(): number {
        const virtualLevel = this.getVirtualLevelWithXp(this._currentXp);
        if (virtualLevel <= this._minSkillLevel) {
            return this._minSkillLevel;
        }
        if (virtualLevel >= this._maxSkillLevel) {
            return this._maxSkillLevel;
        }

        return virtualLevel;
    }

    public addXp(value: number) {
        this._currentXp += value;
    }
}