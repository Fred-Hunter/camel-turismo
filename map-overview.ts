class MapOverview {
    public static showMap(){
        CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
        CanvasService.showCanvas(CanvasNames.MapOverview);
    }
    public static hideMap(){
        CanvasService.hideCanvas(CanvasNames.MapOverview);
    }

    public static renderMap() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        const ctx = canvas?.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = './graphics/camelmap-nobreed.svg';
        img.width = 10;//window.innerWidth;
        ctx.drawImage(img, 0, 0, window.innerWidth, 0.815 * window.innerWidth);

        canvas.addEventListener("click", () => {
            CanvasService.showAllCanvas();
            this.hideMap();
        });
    }
}
