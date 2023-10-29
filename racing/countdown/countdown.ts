import { CanvasNames } from "../../global/canvas-names.js";
import { CanvasService } from "../../global/canvas-service.js";
import { GlobalStaticConstants } from "../../global/global-static-constants.js";

export class Countdown {
    constructor(
    ) {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.Countdown);
        this._ctx = this._canvas.getContext('2d')!;
    }

    private readonly _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;

    displayCountdown(seconds: number) {
        this._ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        const middleX = this._canvas.width / GlobalStaticConstants.devicePixelRatio / 2;
        const middleY = this._canvas.height / GlobalStaticConstants.devicePixelRatio / 2;

        this._ctx.font = "240px Garamond";
        this._ctx.fillText(Math.floor(seconds / 1000).toString(), middleX - 30, middleY);
    }
}
