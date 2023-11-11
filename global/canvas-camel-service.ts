import { Colour } from "../assets/colours.js";
import { CamelCoords } from "../assets/isometric-coords/camel-coords.js";
import { IsometricCoordsDrawer } from "../assets/isometric-coords/isometric-coords-drawer.js";
import { CubeService } from "./cube-service.js";
import { ImportantService } from "./important-service.js";

export class CanvasCamelService {
    constructor(public readonly ctx: CanvasRenderingContext2D) {
        this._cubeService = new CubeService(ctx);
    }

    private _cubeService: CubeService;
    
    public drawCamelScreenCoords(x: number, y: number, size: number, colour: string): void {
        const isoCoords = ImportantService.ConvertRealToCoord(x, y);

        IsometricCoordsDrawer.drawCamel(isoCoords.x2, isoCoords.y2, CamelCoords.getNegativeY(colour), this._cubeService, 0, 1, size);
    }
}
