import { GlobalStaticConstants } from "./global-static-constants.js";
export class ImportantService {
    static ConvertCoordToReal(coordX, coordY, sideLength, height = 0, xStart = 0, yStart = 0) {
        const xOffset = GlobalStaticConstants.innerWidth / 2;
        coordX = coordX * GlobalStaticConstants.baseCubeSize / sideLength;
        coordY = coordY * GlobalStaticConstants.baseCubeSize / sideLength;
        const xScaleFactor = GlobalStaticConstants.baseCubeSize / 5;
        const yScaleFactor = xScaleFactor / 2;
        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * xScaleFactor;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * yScaleFactor;
        return { x, y };
    }
    static ConvertRealToCoord(x, y, sideLength, height = 0, xStart = 0, yStart = 0) {
        const xOffset = GlobalStaticConstants.innerWidth / 2;
        const coordX = (2 * height * sideLength - 20 * xStart + x - xOffset + 2 * y - 200) / (2 * sideLength);
        const coordY = (2 * height * sideLength - 20 * yStart - x + xOffset + 2 * y - 200) / (2 * sideLength);
        const x2 = coordX * sideLength / GlobalStaticConstants.baseCubeSize;
        const y2 = coordY * sideLength / GlobalStaticConstants.baseCubeSize;
        return { x2, y2 };
    }
}