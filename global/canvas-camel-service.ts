import { CubeService } from "./cube-service";
import { GlobalStaticConstants } from "./global-static-constants";
import { ImportantService } from "./important-service";

export class CanvasCamelService {
    constructor(public readonly ctx: CanvasRenderingContext2D) {
        this._cubeService = new CubeService(ctx);
    }

    private _cubeService: CubeService;
    
    public drawCamelIsoCoords(xCoord: number, yCoord: number, size: number, colour: string, height = 0): void {
        const scaleFactor = GlobalStaticConstants.baseCubeSize / 5;

        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1.5, 0, -3 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 0, 0, -2 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, -2 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, -size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 2, 0, -size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 0, 0, 0);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, 0);
    }

    public drawCamelScreenCoords(xCoord: number, yCoord: number, size: number, colour: string): void {
        const isoCoords = ImportantService.ConvertRealToCoord(xCoord, yCoord, size);
        this.drawCamelIsoCoords(isoCoords.x2, isoCoords.y2, size, colour);
    }
}
