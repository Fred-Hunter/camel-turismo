class GymSession {
    private _sessionActive = false;
    private _xpGained = 0;
    private _staminaRemaining = 0;

    constructor(
        private readonly _skill: CamelSkill,
        _maxStamina: number,
        private readonly _xpChangeOnSuccessfulAction = 9,
        private readonly _staminaChangeOnSuccessfulAction = -3,
        private readonly _staminaChangeOnFailedAction = -10) { 
            this._staminaRemaining = _maxStamina;
        }

    public startSession() {
        this._sessionActive = true;
        this._xpGained = 0;
    }
    
    public onSuccessfulAction() {
        // Review
        if (!this._sessionActive) {
            return;
        }

        this._xpGained += this._xpChangeOnSuccessfulAction;
        this._staminaRemaining += this._staminaChangeOnSuccessfulAction; // TODO: range of values
        this.postAction();
    }

    public onFailedAction() {
        if (!this._sessionActive) {
            return;
        }

        this._staminaRemaining += this._staminaChangeOnFailedAction;
        return this.postAction();
    }

    private postAction() {
        if (!this._sessionActive) {
            return;
        }
        if (this._staminaRemaining <= 0) {
            this._xpGained /= 2;
            this.endSession();
        }
    }

    public endSession() {
        if (!this._sessionActive) {
            return;
        }
        this._skill.addXp(this._xpGained);
        this._sessionActive = false;
    }
}