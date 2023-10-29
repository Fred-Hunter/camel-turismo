import { GlobalStaticConstants } from "./global-static-constants.js";
export class CanvasService {
    static createCanvas(zIndex, name = "default") {
        const canvas = document.createElement('canvas');
        canvas.setAttribute("id", `canvas-${name}`);
        document.body.appendChild(canvas);
        const width = GlobalStaticConstants.innerWidth;
        const height = GlobalStaticConstants.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.position = 'absolute';
        canvas.style.zIndex = zIndex;
        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = GlobalStaticConstants.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);
        const ctx = canvas.getContext('2d');
        // Normalize coordinate system to use css pixels.
        ctx.scale(scale, scale);
        return canvas;
    }
    static getCurrentCanvas() {
        return Array.from(document.querySelectorAll("canvas")).sort(c => +c.style.zIndex)[0];
    }
    static setCanvasZIndex(canvasName, zIndex) {
        this.getCanvasByName(canvasName).style.zIndex = `${zIndex}`;
    }
    static bringCanvasToTop(canvasName) {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        const getMax = (a, b) => Math.max(a, b);
        const maxZIndex = allCanvases?.map(c => +c.style.zIndex).reduce(getMax, 0);
        this.setCanvasZIndex(canvasName, maxZIndex + 1);
    }
    static resetCanvases() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => this.setCanvasZIndex(c.id, 0));
    }
    static hideCanvas(canvasName) {
        this.getCanvasByName(canvasName).style.display = "none";
    }
    static hideAllCanvas() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => c.style.display = "none");
    }
    static showAllCanvas() {
        const allCanvases = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => c.style.display = "initial");
    }
    static showCanvas(canvasName) {
        this.getCanvasByName(canvasName).style.display = "initial";
    }
    static getCanvasByName(canvasName) {
        const canvas = document.querySelector(`#canvas-${canvasName}`);
        if (!canvas) {
            throw "`No canvas found with name: ${canvasName}`";
        }
        return canvas;
    }
}
