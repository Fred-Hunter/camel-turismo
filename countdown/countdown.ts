class Countdown {
    constructor(
    ) {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.Countdown);
        this._ctx = this._canvas.getContext('2d')!;
    }

    private readonly _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;

    displayCountdown(seconds: number) {
        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        const middleX = this._canvas.width / window.devicePixelRatio / 2;
        const middleY = this._canvas.height / window.devicePixelRatio / 2;

        this._ctx.font = "120px Garamond";
        this._ctx.fillText(Math.floor(seconds / 1000).toString(), middleX - 10, middleY);
    }
}
