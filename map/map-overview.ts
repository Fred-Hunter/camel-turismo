class MapOverview {
	public static showMap() {
		CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
		CanvasService.showCanvas(CanvasNames.MapOverview);
		GameState.Save();
	}
	public static hideMap() {
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
			height: GlobalStaticConstants.innerHeight,
		};

		if (scaleToWidth) {
			rect = {
				x: 0,
				y: 0,
				width: GlobalStaticConstants.innerWidth,
				height: 0.815 * GlobalStaticConstants.innerWidth,
			};
		}

		const img = new Image();
		img.src = "./graphics/camelmap-nobreed-v3.svg";
		ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);

		canvas.addEventListener(
			"click",
			(event) => {
				const mousePosition = this.getMousePosition(event);

				// Hire
				if (mousePosition.x < rect.width / 3 && mousePosition.y < (7 * rect.height) / 16) {
					CanvasService.showAllCanvas();
					this.hideMap();
					CashMoneyService.drawCashMoney(CanvasService.getCanvasByName(CanvasNames.Recruitment).getContext("2d")!);
					CanvasService.bringCanvasToTop(CanvasNames.Recruitment);
				}
				// Gym
				else if (mousePosition.x > (11 * rect.width) / 32 && mousePosition.x < (19 * rect.width) / 32 && mousePosition.y < (3 * rect.height) / 8) {
					if (!GameState.camel) {
						PopupService.drawAlertPopup("You cannot got to the gym without a camel, you idiot!");
						return;
					}
					CanvasService.showAllCanvas();
					this.hideMap();
					CanvasService.bringCanvasToTop(CanvasNames.GymBackground);
					CanvasService.bringCanvasToTop(CanvasNames.GymCamel);
					new GymDrawing(globalServices.navigatorService).drawGym();
				}
				// ?
				else if (mousePosition.x > (3 * rect.width) / 8 && mousePosition.x < (19 * rect.width) / 32 && mousePosition.y > (7 * rect.height) / 16) {
					if (!!GameState.camel && GameState.camel.agility.level > 20) {
						GameState.cashMoney += 1000;
						CashMoneyService.drawCashMoney(ctx);
					}
					if (!!event.altKey) {
						console.log(GlobalStaticConstants.debugMode);
						GlobalStaticConstants.debugMode = !GlobalStaticConstants.debugMode;
						console.log(GlobalStaticConstants.debugMode);
						PopupService.drawAlertPopup(`${GlobalStaticConstants.debugMode ? "Enabled" : "Disabled"} debug mode, you idiot!`);
					}
				}
				// Race
				else if (mousePosition.x < rect.width / 3 && mousePosition.y > rect.height / 2) {
					if (!GameState.camel) {
						PopupService.drawAlertPopup("You cannot enter a race without a camel, you idiot!");
						return;
					}
					globalServices.navigatorService.requestPageNavigation(Page.raceSelection);
				}
				// Management
				else if (
					mousePosition.x > (19 * rect.width) / 32 &&
					mousePosition.x < rect.width &&
					mousePosition.y > (3 * rect.height) / 16 &&
					mousePosition.y < (9 * rect.height) / 16
				) {
					if (!GameState.camel) {
						PopupService.drawAlertPopup("You cannot manage camel skills without a camel, you idiot!");
						return;
					}

					globalServices.navigatorService.requestPageNavigation(Page.managementSelect);
				}
			},
			false
		);

		CalendarOverviewDrawing.drawCalendarOverview(canvas);

		CashMoneyService.drawCashMoney(ctx);
	}
}
