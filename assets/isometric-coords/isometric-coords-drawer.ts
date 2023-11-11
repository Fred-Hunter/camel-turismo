import { CubeService } from "../../global/cube-service.js";
import { Colour } from "../colours.js";

export class IsometricCoordsDrawer {
    public static draw(
        parentXCoord: number,
        parentYCoord: number,
        asset: Array<{ x: number, y: number, colour: Colour }>,
        cubeService: CubeService,
        height = 0,
        parentScale: number = 1,
        scale: number = 0.1,
        includeOffset = false
    ) {
        const xOffset = includeOffset ? (Math.random() - 0.5) * 0.25 : 0;
        const yOffset = includeOffset ? (Math.random() - 0.5) * 0.25: 0;

        asset.forEach(coord => {
            cubeService.drawSubCube(coord.colour, parentXCoord, parentYCoord, parentScale, scale, xOffset + coord.x * scale, yOffset + coord.y * scale, height);
        });
    }

    public static drawCamel(
        parentXCoord: number,
        parentYCoord: number,
        asset: Array<{ x: number, y: number, colour: string }>,
        cubeService: CubeService,
        height = 0,
        parentScale: number = 1,
        scale: number = 0.1,
    ) {
        asset.forEach(coord => {
            cubeService.drawCustomColourSubCube(coord.colour, parentXCoord, parentYCoord, parentScale, scale, coord.x * scale, coord.y * scale, height);
        });
    }
}
