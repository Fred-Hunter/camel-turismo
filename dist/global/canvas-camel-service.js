import { CamelCoords } from "../assets/isometric-coords/camel-coords.js";
import { IsometricCoordsDrawer } from "../assets/isometric-coords/isometric-coords-drawer.js";
import { CubeService } from "./cube-service.js";
import { ImportantService } from "./important-service.js";
export class CanvasCamelService {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
        this._cubeService = new CubeService(ctx);
    }
    _cubeService;
    drawCamelScreenCoords(x, y, size, colour) {
        const isoCoords = ImportantService.ConvertRealToCoord(x, y);
        IsometricCoordsDrawer.drawCamel(isoCoords.x2, isoCoords.y2, CamelCoords.getNegativeY(colour), this._cubeService, 0, 1, size);
    }
}
