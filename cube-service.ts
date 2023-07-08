class CubeService {
    constructor(public readonly ctx: CanvasRenderingContext2D) {
    }

    public drawCube(
        coordX: number,
        coordY: number,
        sideLength: number,
        colour: string,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0,): void {

        const { x, y } = ImportantService.ConvertCoordToReal(coordX, coordY, sideLength, height, xStart, yStart);

        // left
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x - sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 10);
        this.ctx.fill();

        // right
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x + sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 0);
        this.ctx.fill();

        // top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5)
        this.ctx.closePath();

        this.ctx.fillStyle = this.shadeColor(colour, 20);

        this.ctx.fill();

        this.ctx.fillStyle = '#000000'
        // this.ctx.fillText(coordX + ',' + coordY, x, y);
    }

    public shadeColor(colour: string, percent: number) {
        colour = colour.substring(1);
        const num = parseInt(colour, 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}