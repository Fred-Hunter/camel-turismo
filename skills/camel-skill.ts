class CamelSkill {
    constructor(private readonly _name: string) {
        
    }

    private readonly _minSkillLevel = 1;
    private readonly _maxSkillLevel = 99;
    private _currentXp = 0;

    public get name() {
        return this._name;
    }
    
    public get level(): number {
        const virtualLevel = Math.floor(this._currentXp / 100);
        if (virtualLevel <= this._minSkillLevel) {
            return this._minSkillLevel;
        }
        if (virtualLevel >= this._maxSkillLevel) {
            return this._maxSkillLevel;
        }

        return virtualLevel;
    }

    public set addXp(value: number) {
        this._currentXp += value;
    }
}