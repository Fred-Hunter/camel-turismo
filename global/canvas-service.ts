import { GlobalStaticConstants } from "./global-static-constants";

export class CanvasService {
    public static createCanvas(zIndex: string, name: string = "default"): HTMLCanvasElement {
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

        const ctx = canvas.getContext('2d')!;

        // Normalize coordinate system to use css pixels.
        ctx.scale(scale, scale);

        return canvas;
    }

    public static getCurrentCanvas(): HTMLCanvasElement{
        return Array.from(document.querySelectorAll("canvas")).sort(c => +c.style.zIndex)[0];
    }

    public static setCanvasZIndex(canvasName:string, zIndex: number): void{
        this.getCanvasByName(canvasName).style.zIndex = `${zIndex}`;
    }

    public static bringCanvasToTop(canvasName:string): void{
        const allCanvases: HTMLCanvasElement[] | null = Array.from(document.querySelectorAll("canvas"));

        const getMax = (a: number, b: number) => Math.max(a, b);
        const maxZIndex = allCanvases?.map(c => +c.style.zIndex).reduce(getMax, 0);

        this.setCanvasZIndex(canvasName, maxZIndex + 1);
    }

    public static resetCanvases(): void{
        const allCanvases: HTMLCanvasElement[] | null = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => this.setCanvasZIndex(c.id, 0));
    }

    public static hideCanvas(canvasName:string): void{
        this.getCanvasByName(canvasName).style.display = "none";
    }

    public static hideAllCanvas(): void{
        const allCanvases: HTMLCanvasElement[] | null = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => c.style.display = "none");
    }

    public static showAllCanvas(): void{
        const allCanvases: HTMLCanvasElement[] | null = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => c.style.display = "initial");
    }

    public static showCanvas(canvasName:string): void {
        this.getCanvasByName(canvasName).style.display = "initial";
    }

    public static getCanvasByName(canvasName:string): HTMLCanvasElement{
        const canvas: HTMLCanvasElement | null  = document.querySelector(`#canvas-${canvasName}`);

        if (!canvas) {
            throw "`No canvas found with name: ${canvasName}`";
        }

        return canvas;
    }
}
