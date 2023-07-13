class CanvasBtnService {
    constructor(public canvas: HTMLCanvasElement) {

    }

    eventListeners: Array<(event: MouseEvent) => void> = [];

    getMousePosition(event: any) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    isInside(pos: any, rect: any) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }

    drawBackButton() {
        const maxX = this.canvas.width / window.devicePixelRatio;
        const maxY = this.canvas.height / window.devicePixelRatio;

        this.createBtn(
            maxX / 40, 
            maxY - 100,
            100,
            50,
            0,
            '#cc807a',
            '#f2ada7', 
            '#fff',
            () => mapNavigationRequested = true,
            'Back');
    }

    drawBtn = (context: CanvasRenderingContext2D,
        rect: any,
        radius: number,
        backgroundColour: string,
        borderColour: string,
        fontColour: string,
        text: string) => {

        context.save();

        context.beginPath();
        context.roundRect(rect.x, rect.y, rect.width, rect.height, radius);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = borderColour;
        context.stroke();
        context.closePath();
        context.font = '30pt Garamond';
        context.fillStyle = fontColour;
        context.textAlign = "center";
        context.fillText(text, rect.x + rect.width / 2, rect.y + 3 * rect.height / 4, rect.x + rect.width);

        context.restore();
    }

    displayHoverState = (context: CanvasRenderingContext2D,
        rect: any,
        radius: number,
        borderColour: string,
        fontColour: string,
        text: string) => {
        this.drawBtn(context, rect, radius, borderColour, borderColour, fontColour, text);
    }

    createBtn(
        xStart: number,
        yStart: number,
        width: number,
        height: number,
        radius: number,
        backgroundColour: string,
        borderColour: string,
        fontColour: string,
        onclickFunction: any,
        text: string) {
        var rect = {
            x: xStart,
            y: yStart,
            width: width,
            height: height
        };

        // Binding the click event on the canvas
        var context = this.canvas.getContext('2d')!;

        const handler = (event: MouseEvent) => {
            let mousePos = this.getMousePosition(event);

            if (this.isInside(mousePos, rect)) {
                onclickFunction();
            }
        }

        this.eventListeners.push(handler);

        this.canvas.addEventListener('click', handler, false);

        this.canvas.addEventListener('mousemove', (event) => {
            let mousePos = this.getMousePosition(event);

            if (this.isInside(mousePos, rect)) {
                this.displayHoverState(context, rect, radius, borderColour, fontColour, text);
            } else {
                this.drawBtn(context, rect, radius, backgroundColour, borderColour, fontColour, text);
            }
        }, false);

        this.drawBtn(context, rect, radius, backgroundColour, borderColour, fontColour, text);
    }

    removeEventListeners() {
        this.eventListeners.forEach(o => {
            this.canvas.removeEventListener('click', o, false)
            });
            
        this.eventListeners = [];
    }
}