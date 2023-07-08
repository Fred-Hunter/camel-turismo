class CubeService {
    constructor(public readonly ctx: CanvasRenderingContext2D) {
    }

    public drawHighlightIfMousedOver(
        coordX: number,
        coordY: number,
        sideLength: number,
        colour: string): boolean {

        const xOffset = window.innerWidth / 2;

        const x = xOffset + (coordX - coordY) * sideLength;
        const y = (coordX + coordY) * 0.5 * sideLength + 100;

        // top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5)
        this.ctx.closePath();

        const isMousedOver = false; //this.ctx.isPointInPath(clientMouseX * window.devicePixelRatio, clientMouseY * window.devicePixelRatio);

        if (isMousedOver) {
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillStyle = this.shadeColor(colour, 30);

            this.ctx.fill();
        }

        this.ctx.globalAlpha = 1;

        return isMousedOver;
    }

    public drawCubeArray(
        coordXStart: number,
        coordXEnd: number,
        coordYStart: number,
        coordYEnd: number,
        sideLength: number,
        colour: string,
        height: number = 0,) {

        if (coordXStart > coordXEnd || coordYStart > coordYEnd) {
            return;
        }

        for (let i = coordXStart; i <= coordXEnd; i++) {
            for (let j = coordYStart; j <= coordYEnd; j++) {
                this.drawCube(i, j, sideLength, colour, height);
            }
        }
    }

    public drawCube(
        coordX: number,
        coordY: number,
        sideLength: number,
        colour: string,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0,): void {

        const xOffset = window.innerWidth / 2;

        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;

        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;

        

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
    }

    public drawLeft(
        coordX: number,
        coordY: number,
        sideLength: number,
        colour: string,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0,): void {

        const xOffset = window.innerWidth / 2;

        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;

        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;

        // left
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x - sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 10);
        this.ctx.fill();
    }

    public drawRight(
        coordX: number,
        coordY: number,
        sideLength: number,
        colour: string,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0,): void {

        const xOffset = window.innerWidth / 2;

        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;

        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;

        // right
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x + sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 0);
        this.ctx.fill();
    }

    public drawTop(
        coordX: number,
        coordY: number,
        sideLength: number,
        colour: string,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0,): void {

        const xOffset = window.innerWidth / 2;

        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;

        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + (xStart + yStart) * 5;

        // top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - sideLength, y + sideLength * 0.5);
        this.ctx.lineTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 0.5)
        this.ctx.closePath();

        this.ctx.fillStyle = this.shadeColor(colour, 20);

        this.ctx.fill();
    }

    public drawRealCube(
        x: number,
        y: number,
        sideLength: number,
        colour: string): void {

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
    }

    public drawPyramid(
        coordX: number,
        coordY: number,
        sideLength: number,
        colour: string,
        height: number = 0,
        xStart: number = 0,
        yStart: number = 0,): void {

        const xOffset = window.innerWidth / 2;

        coordX = coordX * 50 / sideLength;
        coordY = coordY * 50 / sideLength;

        const x = xOffset + (coordX - coordY) * sideLength + (xStart - yStart) * 10;
        const y = (coordX + coordY) * 0.5 * sideLength + 100 - height * sideLength + yStart * 10;

        // left
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x - sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 10);
        this.ctx.fill();

        // right
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + sideLength);
        this.ctx.lineTo(x + sideLength, y + sideLength * 1.5);
        this.ctx.lineTo(x, y + sideLength * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.shadeColor(colour, 0);
        this.ctx.fill();

        this.ctx.fill();
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
