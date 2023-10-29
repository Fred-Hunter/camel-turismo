export class CanvasCamelService {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
        this._cubeService = new CubeService(ctx);
    }
    _cubeService;
    drawCamelIsoCoords(xCoord, yCoord, size, colour, height = 0) {
        const scaleFactor = GlobalStaticConstants.baseCubeSize / 5;
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1.5, 0, -3 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 0, 0, -2 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, -2 * size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, -size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 2, 0, -size / scaleFactor);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 0, 0, 0);
        this._cubeService.drawCube(xCoord, yCoord, size, colour, height + 1, 0, 0);
    }
    drawCamelScreenCoords(xCoord, yCoord, size, colour) {
        const isoCoords = ImportantService.ConvertRealToCoord(xCoord, yCoord, size);
        this.drawCamelIsoCoords(isoCoords.x2, isoCoords.y2, size, colour);
    }
}
