class MapOverview {
    public static showMap(){
        CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
        CanvasService.showCanvas(CanvasNames.MapOverview);
    }
    public static hideMap(){
        CanvasService.hideCanvas(CanvasNames.MapOverview);
    }
}
