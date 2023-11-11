import { Camel } from "../../management/camel-creation/camel.js";

export class RacingCamel {
    constructor(
        public camel: Camel) {
        this._initialVelocity = this._defaultCamelJumpVelocity + this.camel.agility.level / 2;
        this._maxHeight = Math.pow(this._initialVelocity, 2) / this._gravityAcceleration - this._initialVelocity - this._gravityAcceleration;
        this.stamina = this.camel.stamina.level;
        this.agility = this.camel.agility.level;
        this.intimidation = this.camel.intimidation.level;
        this.confidence = this.camel.confidence.level;
    }

    finalPosition: number | undefined;
    completionPercentage: number = 0;
    stamina: number = 0;
    agility: number = 0;
    intimidation: number = 0;
    confidence: number = 0;
    currentSpeed: number = 0;
    form: number = 0;
    motivation: number = 0;

    private _jumpHeight = 0;

    public get jumpHeight() {
        return this._jumpHeight / this._maxHeight;
    }

    private readonly _defaultCamelJumpVelocity = 100;
    private readonly _gravityAcceleration = 9.81;
    private readonly _initialVelocity: number;
    private readonly _maxHeight: number;
    private _currentVelocity = 0;

    public startJump() {
        this._currentVelocity = this._initialVelocity;
    }

    public handleJumpTick() {
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
