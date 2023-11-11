export class RacingCamel {
    camel;
    constructor(camel) {
        this.camel = camel;
        this._initialVelocity = this._defaultCamelJumpVelocity + this.camel.agility.level / 2;
        this._maxHeight = Math.pow(this._initialVelocity, 2) / this._gravityAcceleration - this._initialVelocity - this._gravityAcceleration;
        this.stamina = this.camel.stamina.level;
        this.agility = this.camel.agility.level;
        this.intimidation = this.camel.intimidation.level;
        this.confidence = this.camel.confidence.level;
    }
    finalPosition;
    completionPercentage = 0;
    stamina = 0;
    agility = 0;
    intimidation = 0;
    confidence = 0;
    currentSpeed = 0;
    form = 0;
    motivation = 0;
    _jumpHeight = 0;
    get jumpHeight() {
        return this._jumpHeight / this._maxHeight;
    }
    _defaultCamelJumpVelocity = 100;
    _gravityAcceleration = 9.81;
    _initialVelocity;
    _maxHeight;
    _currentVelocity = 0;
    startJump() {
        this._currentVelocity = this._initialVelocity;
    }
    handleJumpTick() {
        if (this.completionPercentage >= 1) {
            this._jumpHeight = 0;
            this._currentVelocity = 0;
            return;
        }
        if (this._currentVelocity == 0) {
            // Have to start the jump
            return;
        }
        this._jumpHeight += this._currentVelocity;
        this._currentVelocity -= this._gravityAcceleration;
        if (this._jumpHeight < 0) {
            this._jumpHeight = 0;
            this._currentVelocity = 0;
        }
        // Remove
        if (this._jumpHeight == 0) {
            this.startJump();
        }
    }
}
