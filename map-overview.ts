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
            height: window.innerHeight
        };

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
            
            // Hire
            if (mousePosition.x < rect.width/2 && mousePosition.y < rect.height/2) {
                CanvasService.showAllCanvas();
                this.hideMap();
                CashMoneyService.drawCashMoney(CanvasService.getCanvasByName(CanvasNames.Recruitment).getContext("2d")!);
                CanvasService.bringCanvasToTop(CanvasNames.Recruitment);
            }
            // Gym
            else if (mousePosition.x > rect.width/2 && mousePosition.y < rect.height/2) {
                if (!camel) {
                    PopupService.drawAlertPopup("You cannot got to the gym without a camel, you idiot!");
                    return;
                }
                CanvasService.showAllCanvas();
                this.hideMap();
                CanvasService.bringCanvasToTop(CanvasNames.GymBackground);
                CanvasService.bringCanvasToTop(CanvasNames.GymCamel);
                (new GymDrawing).drawGym();
            }
            else if (mousePosition.x > rect.width/2 && mousePosition.y > rect.height/2) {
                cashMoney += 1000;
                CashMoneyService.drawCashMoney(ctx);
            }
            // Race
            else if (mousePosition.x < rect.width/2 && mousePosition.y > rect.height/2) {
                if(!!camel) {
                    enterRequestSelectionRequested = true;
                }
            }
        }, false);

        CashMoneyService.drawCashMoney(ctx);
    }
}
