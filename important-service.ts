class ImportantService {
    static ConvertCoordToReal(
        coordX: number, 
        coordY: number, 
        sideLength: number,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0) {

        const xOffset = window.innerWidth / 2;

        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;

        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;

        return {x, y};
    }
}