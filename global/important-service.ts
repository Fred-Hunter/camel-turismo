import { GlobalStaticConstants } from "./global-static-constants.js";

export class ImportantService {
    static ConvertCoordToReal(
        coordX: number,
        coordY: number,
        scale: number = 1,
        height: number = 0) {

        const xOffset = GlobalStaticConstants.innerWidth / 2;
        const yOffset = GlobalStaticConstants.innerHeight / 20;

        const size = scale * GlobalStaticConstants.baseCubeSize;

        const x = xOffset + (coordX - coordY) * size;
        const y = yOffset + height + (coordX + coordY) * size * (1 / 2);

        return { x, y };
    }

    static ConvertRealToCoord(
        x: number,
        y: number,
        scale: number = 1,
        height: number = 0) {

        const xOffset = GlobalStaticConstants.innerWidth / 2;
        const yOffset = GlobalStaticConstants.innerHeight / 20;

        const size = scale * GlobalStaticConstants.baseCubeSize;

        const x2 = (y - yOffset - height + (x - xOffset) / 2) / size;
        const y2 = (y - yOffset - height + (xOffset - x) / 2) / size;

        return { x2, y2 };
    }
}
