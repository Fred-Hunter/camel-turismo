class ImportantService {
    static ConvertCoordToReal(
        coordX: number, 
        coordY: number, 
        sideLength: number,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0) {

        const xOffset = GlobalStaticConstants.innerWidth / 2;

        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;

        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;

        return {x, y};
    }

    static ConvertRealToCoord(
        x: number,
        y: number,
        sideLength: number,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0) {
            
        const xOffset = GlobalStaticConstants.innerWidth / 2;
      
        const coordX = (2 * height * sideLength - 20 * xStart + x - xOffset + 2*y -200)/(2*sideLength);
        const coordY = (2 * height * sideLength - 20 * yStart - x + xOffset + 2*y -200)/(2*sideLength);

        const x2 = coordX * sideLength / 50;
        const y2 = coordY * sideLength / 50;
      
        return {x2, y2};
    }      
}