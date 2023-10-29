import { Camel } from "../../management/camel-creation/camel";

export class RacingCamel {
    constructor(
        public camel: Camel) { 
            this._initialVelocity = 5 + (this.camel.agility.level / 10);
            this.stamina = this.camel.stamina.level;
            this.agility = this.camel.agility.level;
        }

    finalPosition: number | undefined;
    completionPercentage: number = 0;
    stamina: number = 0;
    agility: number = 0;
    currentSpeed: number = 0;
    form: number = 0;

    private _jumpHeight = 0;

    public get jumpHeight() {
        return this._jumpHeight;
    }

    private readonly _gravityAcceleration = 9.81;
    private readonly _scaleFactor = 20;
    private readonly _initialVelocity: number = 0;
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

        this._jumpHeight += this._currentVelocity / this._scaleFactor;
        this._currentVelocity += - (this._gravityAcceleration) / this._scaleFactor;
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
