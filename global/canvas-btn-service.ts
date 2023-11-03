import { NavigatorService } from "../navigation/navigator-service.js";
import { Page } from "../navigation/page.js";
import { GlobalStaticConstants } from "./global-static-constants.js";

export class CanvasBtnService {
    constructor(
        public canvas: HTMLCanvasElement,
        private readonly _navigator: NavigatorService) { }

    clickEventListeners: Array<(event: MouseEvent) => void> = [];
    mouseMoveEventListeners: Array<(event: MouseEvent) => void> = [];

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

    drawBackButton(targetPage: Page, backgroundColour: string = '#cc807a', borderColour: string = '#f2ada7') {
        const maxX = this.canvas.width / GlobalStaticConstants.devicePixelRatio;
        const maxY = this.canvas.height / GlobalStaticConstants.devicePixelRatio;

        this.createBtn(
            maxX / 40,
            maxY - 100,
            100,
            50,
            0,
            5,
            backgroundColour,
            borderColour,
            '#fff',
            () => this._navigator.requestPageNavigation(targetPage),
            ['Back']);
    }

    drawBtn = (context: CanvasRenderingContext2D,
        rect: any,
        radius: number,
        borderWidth: number,
        backgroundColour: string,
        borderColour: string,
        fontColour: string,
        text: string[],
        fontSize: number = 30) => {

        context.save();

        context.beginPath();
        context.roundRect(rect.x, rect.y, rect.width, rect.height, radius);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = borderWidth;
        context.strokeStyle = borderColour;
        context.stroke();
        context.closePath();
        context.font = `${fontSize}pt Garamond`;
        context.fillStyle = fontColour;
        context.textAlign = "center";
        if (text.length < 2) {
            context.fillText(text[0], rect.x + rect.width / 2, rect.y + 3 * rect.height / 4, rect.width - 10);
        } else {
            let lineHeight = 0.25;
            text.forEach(line => {
                context.fillText(line, rect.x + rect.width / 2, rect.y + ++lineHeight * 1.25 * rect.height / 4, rect.width - 10);
            });
        }

        context.restore();
    }

    displayHoverState = (context: CanvasRenderingContext2D,
        rect: any,
        radius: number,
        borderWidth: number,
        borderColour: string,
        fontColour: string,
        text: string[]) => {
        this.drawBtn(context, rect, radius, borderWidth, borderColour, borderColour, fontColour, text);
    }

    createBtn(
        xStart: number,
        yStart: number,
        width: number,
        height: number,
        radius: number,
        borderWidth: number,
        backgroundColour: string,
        borderColour: string,
        fontColour: string,
        onclickFunction: any,
        text: string[],
        fontSize: number = 30) {
        var rect = {
            x: xStart,
            y: yStart,
            width: width,
            height: height
        };

        // Binding the click event on the canvas
        var context = this.canvas.getContext('2d')!;

        const clickHandler = (event: MouseEvent) => {
            let mousePos = this.getMousePosition(event);

            if (this.isInside(mousePos, rect)) {
                onclickFunction();
            }
        };

        this.clickEventListeners.push(clickHandler);
        this.canvas.addEventListener('click', clickHandler, false);

        const mouseMoveEventHandler = (event: MouseEvent) => {
            let mousePos = this.getMousePosition(event);

            if (this.isInside(mousePos, rect)) {
                this.displayHoverState(context, rect, radius, borderWidth, borderColour, fontColour, text);
            } else {
                this.drawBtn(context, rect, radius, borderWidth, backgroundColour, borderColour, fontColour, text, fontSize);
            }
        };

        this.mouseMoveEventListeners.push(mouseMoveEventHandler);
        this.canvas.addEventListener('mousemove', mouseMoveEventHandler, false);

        this.drawBtn(context, rect, radius, borderWidth, backgroundColour, borderColour, fontColour, text, fontSize);
    }

    removeEventListeners() {
        this.clickEventListeners.forEach(o => {
            this.canvas.removeEventListener('click', o, false)
        });

        this.clickEventListeners = [];

        this.mouseMoveEventListeners.forEach(o => {
            this.canvas.removeEventListener('mousemove', o, false)
        });

        this.mouseMoveEventListeners = [];
    }
}
