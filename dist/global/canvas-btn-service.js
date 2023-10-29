import { GlobalStaticConstants } from "./global-static-constants.js";
export class CanvasBtnService {
    canvas;
    _navigator;
    constructor(canvas, _navigator) {
        this.canvas = canvas;
        this._navigator = _navigator;
    }
    clickEventListeners = [];
    mouseMoveEventListeners = [];
    getMousePosition(event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
    isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
    }
    drawBackButton(targetPage, backgroundColour = '#cc807a', borderColour = '#f2ada7') {
        const maxX = this.canvas.width / GlobalStaticConstants.devicePixelRatio;
        const maxY = this.canvas.height / GlobalStaticConstants.devicePixelRatio;
        this.createBtn(maxX / 40, maxY - 100, 100, 50, 0, 5, backgroundColour, borderColour, '#fff', () => this._navigator.requestPageNavigation(targetPage), ['Back']);
    }
    drawBtn = (context, rect, radius, borderWidth, backgroundColour, borderColour, fontColour, text) => {
        context.save();
        context.beginPath();
        context.roundRect(rect.x, rect.y, rect.width, rect.height, radius);
        context.fillStyle = backgroundColour;
        context.fill();
        context.lineWidth = borderWidth;
        context.strokeStyle = borderColour;
        context.stroke();
        context.closePath();
        context.font = '30pt Garamond';
        context.fillStyle = fontColour;
        context.textAlign = "center";
        if (text.length < 2) {
            context.fillText(text[0], rect.x + rect.width / 2, rect.y + 3 * rect.height / 4, rect.width - 10);
        }
        else {
            let lineHeight = 0.25;
            text.forEach(line => {
                context.fillText(line, rect.x + rect.width / 2, rect.y + ++lineHeight * 1.25 * rect.height / 4, rect.width - 10);
            });
        }
        context.restore();
    };
    displayHoverState = (context, rect, radius, borderWidth, borderColour, fontColour, text) => {
        this.drawBtn(context, rect, radius, borderWidth, borderColour, borderColour, fontColour, text);
    };
    createBtn(xStart, yStart, width, height, radius, borderWidth, backgroundColour, borderColour, fontColour, onclickFunction, text) {
        var rect = {
            x: xStart,
            y: yStart,
            width: width,
            height: height
        };
        // Binding the click event on the canvas
        var context = this.canvas.getContext('2d');
        const clickHandler = (event) => {
            let mousePos = this.getMousePosition(event);
            if (this.isInside(mousePos, rect)) {
                onclickFunction();
            }
        };
        this.clickEventListeners.push(clickHandler);
        this.canvas.addEventListener('click', clickHandler, false);
        const mouseMoveEventHandler = (event) => {
            let mousePos = this.getMousePosition(event);
            if (this.isInside(mousePos, rect)) {
                this.displayHoverState(context, rect, radius, borderWidth, borderColour, fontColour, text);
            }
            else {
                this.drawBtn(context, rect, radius, borderWidth, backgroundColour, borderColour, fontColour, text);
            }
        };
        this.mouseMoveEventListeners.push(mouseMoveEventHandler);
        this.canvas.addEventListener('mousemove', mouseMoveEventHandler, false);
        this.drawBtn(context, rect, radius, borderWidth, backgroundColour, borderColour, fontColour, text);
    }
    removeEventListeners() {
        this.clickEventListeners.forEach(o => {
            this.canvas.removeEventListener('click', o, false);
        });
        this.clickEventListeners = [];
        this.mouseMoveEventListeners.forEach(o => {
            this.canvas.removeEventListener('mousemove', o, false);
        });
        this.mouseMoveEventListeners = [];
    }
}