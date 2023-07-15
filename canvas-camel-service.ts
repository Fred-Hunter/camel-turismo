class CanvasCamelService {
    constructor(public readonly ctx: CanvasRenderingContext2D) {
        this._cubeService = new CubeService(ctx);
    }

    private _cubeService: CubeService;
    
    public drawCamelIsoCoords(xCoord: number, yCoord: number, size: number, colour: string): void {
        this._cubeService.drawCube(xCoord, yCoord, size, colour, 1.5, 0, Math.round(-10 * size / 40));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, 0, 0, Math.round(-6 * size / 40));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, 1, 0, Math.round(-6 * size / 40));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, 1, 0, Math.round(-2 * size / 40));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, 2, 0, Math.round(-2 * size / 40));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, 0, 0, Math.round(2 * size / 40));
        this._cubeService.drawCube(xCoord, yCoord, size, colour, 1, 0, Math.round(2 * size / 40));
    }

    public drawCamelScreenCoords(xCoord: number, yCoord: number, size: number, colour: string): void {
        const isoCoords = ImportantService.ConvertRealToCoord(xCoord, yCoord, size);
        this.drawCamelIsoCoords(isoCoords.x2, isoCoords.y2, size, colour);
    }
}