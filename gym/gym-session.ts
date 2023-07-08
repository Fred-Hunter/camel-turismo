class GymSession {
    protected _sessionActive = false;

    public startSession() {
        this._sessionActive = true;
    }

    public endSession() {
        if (!this._sessionActive) {
            return;
        }
        this._sessionActive = false;
    }
}

class TrainSession extends GymSession {
    private _xpGained = 0;
    private _staminaRemaining = 0;

    constructor(
        protected readonly _skill: CamelSkill,
        _maxStamina: number,) 
    {
        super()
        this._staminaRemaining = _maxStamina;
        PopupService.drawAlertPopup("Press spacebar to train!");
        document.addEventListener('keypress', (event) => {
            if (event.key !== " "){
                return;
            }
            this.onSuccessfulAction();
            console.log(camel.camelSkills)
        }, false);
    }
    
    public startSession(): void {
        this._xpGained = 0;
        super.startSession()
    }

    public onSuccessfulAction() {
        // Review
        if (!this._sessionActive) {
            return;
        }

        this._xpGained += 9;
        this._staminaRemaining += -3; // TODO: range of values
        this.postAction();
    }

    public onFailedAction() {
        if (!this._sessionActive) {
            return;
        }

        this._staminaRemaining += -10;
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
        super.endSession()
        this._skill.addXp(this._xpGained);
    }
}

class SpaSession extends GymSession {
    private _startTime = 0;
    private _staiminaGained = 0;

    constructor(
        protected readonly _skill: CamelSkill) 
    {
        super()
    }

    public startSession(): void {
        this._startTime = secondsPassed;
        super.startSession()
    }

    public endSession() {
        super.endSession()
        this._staiminaGained = secondsPassed - this._startTime;
        if (this._staiminaGained < this._skill.level) {
            this._skill.addSkillValue(this._staiminaGained);
        } else {
            this._skill.addSkillValue(this._skill.level);
        }
    }
}
