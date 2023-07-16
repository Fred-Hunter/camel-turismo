class MapOverview {
    public static showMap(){
        CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
        CanvasService.showCanvas(CanvasNames.MapOverview);
        GameState.Save();
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

        const scaleToWidth = GlobalStaticConstants.innerHeight > 0.815 * GlobalStaticConstants.innerWidth;

        let rect = {
            x: 0,
            y: 0,
            width: GlobalStaticConstants.innerHeight / 0.815,
            height: GlobalStaticConstants.innerHeight
        };

        if (scaleToWidth) {
            rect = {
                x: 0,
                y: 0,
                width: GlobalStaticConstants.innerWidth,
                height: 0.815 * GlobalStaticConstants.innerWidth
            };
        }

        const img = new Image();
        img.src = './graphics/camelmap-nobreed-v3.svg';
        ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);

        canvas.addEventListener('click', (event) => {
        
            const mousePosition = this.getMousePosition(event);
            
            // Hire
            if (mousePosition.x < rect.width/3 && mousePosition.y < 7*rect.height/16) {
                CanvasService.showAllCanvas();
                this.hideMap();
                CashMoneyService.drawCashMoney(CanvasService.getCanvasByName(CanvasNames.Recruitment).getContext("2d")!);
                CanvasService.bringCanvasToTop(CanvasNames.Recruitment);
            }
            // Gym
            else if (mousePosition.x > 11*rect.width/32 && mousePosition.x < 19*rect.width/32 && mousePosition.y < 3*rect.height/8) {
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
            else if (mousePosition.x > 3*rect.width/8 && mousePosition.x < 19*rect.width/32 && mousePosition.y > 7*rect.height/16) {
                if (!!camel && camel.agility.level > 20) {
                    GameState.cashMoney += 1000;
                    CashMoneyService.drawCashMoney(ctx);
                }
            }
            // Race
            else if (mousePosition.x < rect.width/3 && mousePosition.y > rect.height/2) {
                if (!camel) {
                    PopupService.drawAlertPopup("You cannot enter a race without a camel, you idiot!");
                    return;
                }
                enterRequestSelectionRequested = true;
            }
            // Management
            else if (mousePosition.x > 19*rect.width/32 && mousePosition.x < rect.width && mousePosition.y > 3*rect.height/16 && mousePosition.y < 9*rect.height/16) {
                if (!camel) {
                    PopupService.drawAlertPopup("You cannot manage camel skills without a camel, you idiot!");
                }
                skillNavigationRequested = true;
            }
        }, false);

        CashMoneyService.drawCashMoney(ctx);
    }
}
