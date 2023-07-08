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
        ctx.drawImage(img, 100, 100);

        canvas.addEventListener("click", () => {
            CanvasService.showAllCanvas();
            this.hideMap();
        });
    }
}
