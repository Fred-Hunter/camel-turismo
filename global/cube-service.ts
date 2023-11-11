import { Colour, ColourCodes } from "../assets/colours.js";
import { GlobalStaticConstants } from "./global-static-constants.js";
import { ImportantService } from "./important-service.js";

export class CubeService {
    constructor(public readonly ctx: CanvasRenderingContext2D) {
    }

    public drawSubCube(
        colour: Colour,
        parentCoordX: number,
        parentCoordY: number,
        parentScale: number,
        subCubeScale: number,
        xStartPercent: number,
        yStartPercent: number,
        height: number = 0
    ) {
       this.drawCustomColourSubCube(ColourCodes.getCode(colour), parentCoordX, parentCoordY, parentScale, subCubeScale, xStartPercent, yStartPercent, height);
    }

    public drawCustomColourSubCube(
        colour: string,
        parentCoordX: number,
        parentCoordY: number,
        parentScale: number,
        subCubeScale: number,
        xStartPercent: number,
        yStartPercent: number,
        height: number = 0
    ) {
        const coordX = parentCoordX + xStartPercent;
        const coordY = parentCoordY + yStartPercent;

        const { x, y } = ImportantService.ConvertCoordToReal(coordX, coordY, parentScale, height);

        this.drawCubeFromReal(colour, x, y, parentScale * subCubeScale);
    }

    public drawCube(
        colour: Colour,
        coordX: number,
        coordY: number,
        scale: number = 1,
        height: number = 0,
    ) {
        const { x, y } = ImportantService.ConvertCoordToReal(coordX, coordY, scale, height);

        this.drawCubeFromReal(ColourCodes.getCode(colour), x, y, scale);
    }

    private drawCubeFromReal(colour: string, x: number, y: number, scale: number) {
        const sideLength = scale * GlobalStaticConstants.baseCubeSize;

        // left
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x - sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = ColourCodes.shadeColor(colour, 10);
        this.ctx.fill();

        // right
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x + sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = ColourCodes.shadeColor(colour, 0);
        this.ctx.fill();

        // top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5)
        this.ctx.closePath();

        this.ctx.fillStyle = ColourCodes.shadeColor(colour, 20);

        this.ctx.fill();

        this.ctx.fillStyle = '#000000'
        // this.ctx.fillText(coordX + ',' + coordY, x, y);
    }
}
