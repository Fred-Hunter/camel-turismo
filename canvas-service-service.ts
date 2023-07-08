class CanvasServiceService {

    public getCurrentCanvas(): HTMLCanvasElement{
        return Array.from(document.querySelectorAll("canvas")).sort(c => +c.style.zIndex)[0];
    }

    public setCanvasZIndex(canvasName:string, zIndex: number): void{
        const canvas: HTMLCanvasElement | null  = document.querySelector(`#${canvasName}`);

        if (!canvas) {
            console.error(`No canvas found with name: ${canvasName}`);
            return;
        }

        canvas.style.zIndex = `${zIndex}`;
    }

    public bringCanvasToTop(canvasName:string): void{
        const allCanvases: HTMLCanvasElement[] | null = Array.from(document.querySelectorAll("canvas"));

        const getMax = (a: number, b: number) => Math.max(a, b);
        const maxZIndex = allCanvases?.map(c => +c.style.zIndex).reduce(getMax, 0);

        this.setCanvasZIndex(canvasName, maxZIndex + 1);
    }

    public resetCanvases(): void{
        const allCanvases: HTMLCanvasElement[] | null = Array.from(document.querySelectorAll("canvas"));
        allCanvases.forEach(c => this.setCanvasZIndex(c.id, 0));
    }
}
