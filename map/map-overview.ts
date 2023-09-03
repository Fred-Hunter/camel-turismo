class MapOverview {
    private static _canvasXOffset = 0;
    private static _mapEventListeners: any[] = [];
    private static _clickZones: any[] = [];
    private static _boundingRect = this.getBoundingRect();

	private static getMousePosition(event: any) {
		const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
		var rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		};
	}

    private static getBoundingRect() {
		const scaleToWidth = GlobalStaticConstants.innerHeight > 0.815 * GlobalStaticConstants.innerWidth;

		return scaleToWidth ?   {
            x: 0,
            y: 0,
            width: GlobalStaticConstants.innerWidth,
            height: 0.815 * GlobalStaticConstants.innerWidth,
        } : {
			x: 0,
			y: 0,
			width: GlobalStaticConstants.innerHeight / 0.815,
			height: GlobalStaticConstants.innerHeight,
		};
    }

	public static load() {
		CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
		CanvasService.showCanvas(CanvasNames.MapOverview);
		GameState.Save();
        
		const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
		const ctx = canvas?.getContext("2d");
		if (!ctx) return;

        ctx.clearRect(0,0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight)

		const img = new Image();
		img.src = "./graphics/camelmap-nobreed-v3.svg";
		ctx.drawImage(img, this._boundingRect.x + this._canvasXOffset, this._boundingRect.y, this._boundingRect.width, this._boundingRect.height);
        
        this.removeEventListeners(canvas);
        this.recreateClickZones();

        const clickHandler = (event: MouseEvent) => {
            const mousePosition = this.getMousePosition(event);

            let zone: string = this.getClickZone(mousePosition);

            switch (zone) {
                case MapLocations.Hire:
                    CanvasService.showAllCanvas();
                    CashMoneyService.drawCashMoney(CanvasService.getCanvasByName(CanvasNames.Recruitment).getContext("2d")!);
                    CanvasService.bringCanvasToTop(CanvasNames.Recruitment);
                    break;

                case MapLocations.Gym:
                    if (!GameState.camel) {
                        PopupService.drawAlertPopup("You cannot got to the gym without a camel, you idiot!");
                        return;
                    }
                    CanvasService.showAllCanvas();
                    CanvasService.bringCanvasToTop(CanvasNames.GymBackground);
                    CanvasService.bringCanvasToTop(CanvasNames.GymCamel);
                    new GymDrawing(globalServices.navigatorService).drawGym();
                    break;
                    
                case MapLocations.Mystery:
                    if (!!GameState.camel && GameState.camel.agility.level > 20) {
                        GameState.cashMoney += 1000;
                        CashMoneyService.drawCashMoney(ctx);
                    }
                    if (!!event.altKey) {
                        GlobalStaticConstants.debugMode = !GlobalStaticConstants.debugMode;
                        PopupService.drawAlertPopup(`${GlobalStaticConstants.debugMode ? "Enabled" : "Disabled"} debug mode, you idiot!`);
                    }
                    break;
                    
                case MapLocations.Race:
                    if (!GameState.camel) {
                        PopupService.drawAlertPopup("You cannot enter a race without a camel, you idiot!");
                        return;
                    }
                    globalServices.navigatorService.requestPageNavigation(Page.raceSelection);
                    break;
                
                case MapLocations.Management:
                    if (!GameState.camel) {
                        PopupService.drawAlertPopup("You cannot manage camel skills without a camel, you idiot!");
                        return;
                    }
                    globalServices.navigatorService.requestPageNavigation(Page.managementSelect);
                    break;
            }
        };

        canvas.addEventListener(
            "click",
            clickHandler,
            false
        );

        this._mapEventListeners.push(clickHandler);

		CalendarOverviewDrawing.drawCalendarOverview(canvas);

		CashMoneyService.drawCashMoney(ctx);

        // Draw debug grid
        if (GlobalStaticConstants.debugMode) {
            ctx.save()
            const gridSize = 32;

            ctx.strokeStyle = "red";
            ctx.font = "8px Arial";
            for (let x = 0; x < GlobalStaticConstants.innerWidth; x += this._boundingRect.width / gridSize) {
                for (let y = 0; y < GlobalStaticConstants.innerHeight; y += this._boundingRect.height / gridSize) {
                    ctx.strokeRect(x, y, this._boundingRect.width / gridSize, this._boundingRect.height / gridSize);
                    ctx.fillText(`${Math.trunc(x/gridSize)},${Math.trunc(y/gridSize)}`, x, y);
                }
            }

            
            ctx.strokeStyle = "blue";
            ctx.font = "16px Arial";
            ctx.lineWidth = 4;
            this._clickZones.forEach(z => {
                ctx.strokeRect(z.clickZone.x, z.clickZone.y, z.clickZone.width, z.clickZone.height);
                ctx.fillText(`${z.location}`, z.clickZone.x, z.clickZone.y + 16);
            })

            ctx.restore();
        }
	}

    private static removeEventListeners(canvas: HTMLCanvasElement) {
        this._mapEventListeners.forEach(o => {
            canvas.removeEventListener('click', o, false)
        });

        this._mapEventListeners = [];
    }

    private static isInside(pos: any, rect: any) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }

    private static getClickZone(pos: any): string {
        let location = MapLocations.None;
        this._clickZones.every(z => {
            if (this.isInside(pos, z.clickZone)){
                location = z.location;
                return false;
            }
            return true;
        })
        return location;
    }

    private static createRect(x: number, y: number, xEnd: number, yEnd: number) {
        return {
            x: x,
            y: y,
            width: xEnd - x,
            height: yEnd - y
        };
    }

    private static recreateClickZones() {
        this._clickZones = [];
        const wUnit = this._boundingRect.width / 32;
        const hUnit = this._boundingRect.height / 32;

        this._clickZones.push(
            {
                location: MapLocations.Hire,
                clickZone: this.createRect(0 + this._canvasXOffset, 0, 11 * wUnit + this._canvasXOffset, 14 * hUnit)
            },
            
            {
                location: MapLocations.Gym,
                clickZone: this.createRect(11 * wUnit + this._canvasXOffset, 0, 19 * wUnit + this._canvasXOffset, 12 * hUnit)
            },
            
            {
                location: MapLocations.Mystery,
                clickZone: this.createRect(12 * wUnit + this._canvasXOffset, 14 * hUnit, 19 * wUnit + this._canvasXOffset, 32 * hUnit)
            },
            
            {
                location: MapLocations.Race,
                clickZone: this.createRect(0 + this._canvasXOffset, 16 * hUnit, 11 * wUnit + this._canvasXOffset, 32 * hUnit)
            },
            
            {
                location: MapLocations.Management,
                clickZone: this.createRect(19 * wUnit + this._canvasXOffset, 6 * hUnit, 32 * wUnit + this._canvasXOffset, 18 * hUnit)
            }
        )
    }
}

class MapLocations {
    public static None: string = "";
    public static Hire: string = "Hire";
    public static Gym: string = "Gym";
    public static Mystery: string = "Mystery";
    public static Race: string = "Race";
    public static Management: string = "Management";
}
