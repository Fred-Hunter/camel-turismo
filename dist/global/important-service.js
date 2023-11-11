import { GlobalStaticConstants } from "./global-static-constants.js";
export class ImportantService {
    static ConvertCoordToReal(coordX, coordY, scale = 1, height = 0) {
        const xOffset = GlobalStaticConstants.innerWidth / 2;
        const yOffset = GlobalStaticConstants.innerHeight / 20;
        const size = scale * GlobalStaticConstants.baseCubeSize;
        coordX -= height;
        coordY -= height;
        const x = xOffset + (coordX - coordY) * size;
        const y = yOffset + (coordX + coordY) * size * (1 / 2);
        return { x, y };
    }
    static ConvertRealToCoord(x, y, scale = 1, height = 0) {
        const xOffset = GlobalStaticConstants.innerWidth / 2;
        const yOffset = GlobalStaticConstants.innerHeight / 20;
        const size = scale * GlobalStaticConstants.baseCubeSize;
        let x2 = (y - yOffset + (x - xOffset) / 2) / size;
        let y2 = (y - yOffset + (xOffset - x) / 2) / size;
        x2 += height;
        y2 += height;
        return { x2, y2 };
    }
}
