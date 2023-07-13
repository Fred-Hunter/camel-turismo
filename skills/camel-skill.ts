class CamelSkill {
    constructor(
        private readonly _name: string,
        private readonly _initialXP = 0) {
        if (_initialXP < 0) {
            throw Error('Cannot create camel skill with negative xp')
        }

        this._currentXp = _initialXP;
        this._level = this.getLevelFromXp(_initialXP);
    }

    private readonly _minSkillLevel = 1;
    private readonly _maxSkillLevel = 99;
    private _currentXp = 0;
    private _level = 0;

    public get name() {
        return this._name;
    }

    private getXpRequiredForLevel(level: number) {
        return (level - 1) * 100;
    }

    private getLevelFromXp(xp: number) {
        return Math.min(this._maxSkillLevel, Math.floor(xp / 100) + 1);
    }

    public set level(level: number) {
        let flooredLevel = Math.floor(level);

        flooredLevel = Math.max(level, this._minSkillLevel);
        flooredLevel = Math.min(level, this._maxSkillLevel);

        this._level = flooredLevel;
        this._currentXp = this.getXpRequiredForLevel(flooredLevel);
    }

    public get level(): number {
        return this._level;
    }

    public getXpToNextLevel(): number {
        if (this._level === this._maxSkillLevel) {
            return 0;
        }

        return this.getXpRequiredForLevel(this.level + 1) - this._currentXp;
    }

    public addXp(value: number) {
        if (value <= 0) {
            throw Error('Cannot add negative or 0 xp');
        }

        this._currentXp += value;
        this._level = this.getLevelFromXp(this._currentXp);
    }
}