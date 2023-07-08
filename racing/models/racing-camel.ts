class RacingCamel {
    constructor(
        public camel: Camel) { 
            this._initialVelocity = 5 + (this.camel.camelSkills.agility.level / 10);
            this.stamina = this.camel.camelSkills.stamina.level;
        }

    completionPercentage: number = 0;
    raceSpeedPerSecond: number = 0;
    color: string = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
    stamina: number = 0;

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