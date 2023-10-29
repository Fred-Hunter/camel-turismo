import { CanvasNames } from "../../global/canvas-names";
import { CanvasService } from "../../global/canvas-service";
import { GlobalStaticConstants } from "../../global/global-static-constants";
export class Countdown {
    constructor() {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.Countdown);
        this._ctx = this._canvas.getContext('2d');
    }
    _ctx;
    _canvas;
    displayCountdown(seconds) {
        this._ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const middleX = this._canvas.width / GlobalStaticConstants.devicePixelRatio / 2;
        const middleY = this._canvas.height / GlobalStaticConstants.devicePixelRatio / 2;
        this._ctx.font = "240px Garamond";
        this._ctx.fillText(Math.floor(seconds / 1000).toString(), middleX - 30, middleY);
    }
}
