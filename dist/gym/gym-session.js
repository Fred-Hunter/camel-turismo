import { GameState } from "../global/game-state";
import { PopupService } from "../global/popup-service";
export class GymSession {
    _sessionActive = false;
    startSession() {
        this._sessionActive = true;
    }
    endSession() {
        if (!this._sessionActive) {
            return;
        }
        this._sessionActive = false;
    }
}
export class TrainSession extends GymSession {
    _skill;
    _xpGained = 0;
    _staminaRemaining = 0;
    constructor(_skill, _maxStamina) {
        super();
        this._skill = _skill;
        this._staminaRemaining = _maxStamina;
        PopupService.drawAlertPopup("Press spacebar to train!");
        document.addEventListener('keypress', (event) => {
            if (event.key !== " ") {
                return;
            }
            this.onSuccessfulAction();
        }, false);
    }
    startSession() {
        this._xpGained = 0;
        super.startSession();
    }
    onSuccessfulAction() {
        // Review
        if (!this._sessionActive) {
            return;
        }
        this._xpGained += 9;
        this._staminaRemaining += -3; // TODO: range of values
        this.postAction();
    }
    onFailedAction() {
        if (!this._sessionActive) {
            return;
        }
        this._staminaRemaining += -10;
        return this.postAction();
    }
    postAction() {
        if (!this._sessionActive) {
            return;
        }
        if (this._staminaRemaining <= 0) {
            this._xpGained /= 2;
            this.endSession();
        }
    }
    endSession() {
        super.endSession();
        GameState.camel.unspentXp += this._xpGained;
    }
}
export class SpaSession extends GymSession {
    _skill;
    _startTime = 0;
    _staiminaGained = 0;
    constructor(_skill) {
        super();
        this._skill = _skill;
    }
    startSession() {
        this._startTime = GameState.secondsPassed;
        super.startSession();
    }
    endSession() {
        super.endSession();
        this._staiminaGained = GameState.secondsPassed - this._startTime;
        if (this._staiminaGained < this._skill.level) {
            GameState.camel.unspentXp += this._staiminaGained;
        }
        else {
            GameState.camel.unspentXp += this._skill.level;
        }
    }
}
