class RacingCamel {
    constructor(
        public camel: Camel) { }

    completionPercentage: number = 0;
    raceSpeedPerSecond: number = 0;
    color: string = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);

    private _jumpHeight = 0;

    public get jumpHeight() {
        return this._jumpHeight;
    }

    private readonly _gravityAcceleration = 9.81;
    private readonly _initialVelocity = 10;
    private readonly _scaleFactor = 10;
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

        if (this._jumpHeight == 0) {
            this.startJump();
        }
    }
}