class MapOverview {
    public static showMap(){
        CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
        CanvasService.showCanvas(CanvasNames.MapOverview);
    }
    public static hideMap(){
        CanvasService.hideCanvas(CanvasNames.MapOverview);
    }

    private static getMousePosition(event: any) {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    public static renderMap() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        const ctx = canvas?.getContext("2d");
        if (!ctx) return;

        const scaleToWidth = window.innerHeight > 0.815 * window.innerWidth;

        
        let rect = {
            x: 0,
            y: 0,
            width: window.innerHeight / 0.815,
            height: window.innerHeight};

        if (scaleToWidth) {
            rect = {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: 0.815 * window.innerWidth
            };
        }

        const img = new Image();
        img.src = './graphics/camelmap-nobreed.svg';
        ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);

        canvas.addEventListener('click', (event) => {
        
            const mousePosition = this.getMousePosition(event);
            

            if (mousePosition.x < rect.width/2 && mousePosition.y < rect.height/2) {
                CanvasService.showAllCanvas();
                this.hideMap();
                CanvasService.bringCanvasToTop(CanvasNames.Recruitment);
            }
            else if (mousePosition.x > rect.width/2 && mousePosition.y < rect.height/2) {
                CanvasService.showAllCanvas();
                this.hideMap();
                CanvasService.bringCanvasToTop(CanvasNames.GymBackground);
                CanvasService.bringCanvasToTop(CanvasNames.GymCamel);
                (new GymDrawing).drawGym();
            }
            else if (mousePosition.x > rect.width/2 && mousePosition.y > rect.height/2) {
                console.log("xxx");
            }
            else if (mousePosition.x < rect.width/2 && mousePosition.y > rect.height/2) {
                document.dispatchEvent(enterRaceSelection);
            }
        }, false);

        CashMoneyService.drawCashMoney(ctx);
    }
}
