import { CalendarOverviewDrawing } from "../calendar/calendar-overview-drawing";
import { CanvasNames } from "../global/canvas-names";
import { CanvasService } from "../global/canvas-service";
import { CashMoneyService } from "../global/cash-money-service";
import { GameState } from "../global/game-state";
import { GlobalStaticConstants } from "../global/global-static-constants";
import { PopupService } from "../global/popup-service";
import { GymDrawing } from "../gym/gym-drawing";
import { globalServices } from "../main";
import { Page } from "../navigation/page";

export class MapOverview {
    private static _canvasXOffset = 0;
    private static _canvasYOffset = 0;
    private static _mapEventListeners: any[] = [];
    private static _clickZones: any[] = [];
    private static _boundingRect = this.getBoundingRect();

    // V2
    private static _tileSize = 8;
    private static _outerPadding = 2;
    private static _tileGap = 0.5;
    private static _locationTiles: MapTile[] = [];
    private static _uiTiles: MapTile[] = [];
    private static _verticalScreen = GlobalStaticConstants.innerHeight > 0.815 * GlobalStaticConstants.innerWidth;
    private static _previousHoverZone = '';

    private static getMousePosition(event: any) {
        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    private static getBoundingRect() {
        return this._verticalScreen ? {
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
        // Set up canvas
        CanvasService.bringCanvasToTop(CanvasNames.MapOverview);
        CanvasService.showCanvas(CanvasNames.MapOverview);
        GameState.Save();

        const canvas = CanvasService.getCanvasByName(CanvasNames.MapOverview);
        const ctx = canvas?.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        this.removeEventListeners(canvas);

        // V2 Load tiles
        this._clickZones = [];
        this.loadLocationTiles();
        this.paintLocationTiles(ctx);
        this.loadUiTiles();

        // V1
        this.removeEventListeners(canvas);
        this.addEventListeners(canvas, ctx);

        CalendarOverviewDrawing.drawCalendarOverview(canvas);

        CashMoneyService.drawCashMoney(ctx);

        if (GlobalStaticConstants.debugMode) {
            this.drawDebugGrid(ctx)
        }
    }

    private static drawDebugGrid(ctx: CanvasRenderingContext2D) {
        ctx.save()
        const gridSize = 32;

        ctx.strokeStyle = "red";
        ctx.font = "8px Arial";
        for (let x = 0; x < GlobalStaticConstants.innerWidth; x += this._boundingRect.width / gridSize) {
            for (let y = 0; y < GlobalStaticConstants.innerHeight; y += this._boundingRect.height / gridSize) {
                ctx.strokeRect(x, y, this._boundingRect.width / gridSize, this._boundingRect.height / gridSize);
                ctx.fillText(`${Math.trunc(x / gridSize)},${Math.trunc(y / gridSize)}`, x, y);
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

    private static addEventListeners(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
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

                case MapLocations.DealLocked:
                    PopupService.drawAlertPopup("You idiot!");
                    return;

                case MapLocations.Deal:
                    PopupService.drawAlertPopup("You idiot!");
                    return;

                case MapLocations.Scrolls:
                    globalServices.navigatorService.requestPageNavigation(Page.scrolls);
                    break;
            }
        };

        const hoverHandler = (event: MouseEvent) => {
            const mousePosition = this.getMousePosition(event);

            const zone: string = this.getClickZone(mousePosition);

            if (zone === this._previousHoverZone) return;

            canvas.style.cursor = "default";
            this.paintLocationTiles(ctx);

            if (zone !== MapLocations.None) {
                const tile = this.getLocationTileByName(zone);
                if (tile !== null) this.paintTile(ctx, tile, GlobalStaticConstants.highlightColour);
                canvas.style.cursor = "pointer";
            }

            this._previousHoverZone = zone;

            return;
        };

        canvas.addEventListener(
            "click",
            clickHandler,
            false
        );

        canvas.addEventListener(
            "mousemove",
            hoverHandler,
            false
        );

        this._mapEventListeners.push(clickHandler, hoverHandler);
    }

    private static removeEventListeners(canvas: HTMLCanvasElement) {
        this._mapEventListeners.forEach(o => {
            canvas.removeEventListener('click', o, false)
            canvas.removeEventListener('mousemove', o, false)
        });

        this._mapEventListeners = [];
    }

    private static isInside(pos: any, rect: any) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }

    private static getClickZone(pos: any): string {
        let location = MapLocations.None;
        this._clickZones.every(z => {
            if (this.isInside(pos, z.clickZone)) {
                location = z.location;
                return false;
            }
            return true;
        })
        return location;
    }

    private static loadLocationTiles() {
        this._locationTiles = [];

        const wUnit = this._boundingRect.width / 32;
        const hUnit = this._boundingRect.height / 32;

        let tilesPlacedCount = 0;

        // Add tiles
        const locationsToAdd = [
            MapLocations.Hire,
            MapLocations.Gym,
            MapLocations.Management,
            MapLocations.Race,
            MapLocations.Mystery,
        ];

        if (GameState.camels.length > 8) {
            locationsToAdd.push(MapLocations.Deal);
        }
        else {
            locationsToAdd.push(MapLocations.DealLocked);
        }

        // Calculate grid
        let getTilesPerRow = () => Math.min(4, Math.max(1, Math.floor((GlobalStaticConstants.innerWidth - this._outerPadding * wUnit) / ((this._tileSize + this._tileGap) * wUnit))));
        let tilesPerRow = getTilesPerRow();
        if (locationsToAdd.length / tilesPerRow > 3) {
            this._tileSize = 4;
            tilesPerRow = getTilesPerRow();
        }

        locationsToAdd.forEach((tile) => {
            this.addLocationTile(tile, wUnit, hUnit, tilesPlacedCount, tilesPerRow);
            tilesPlacedCount++;
        });

        const scrollAlertMessage = GameState.unreadScrollCount > 0 ? GameState.unreadScrollCount.toString() : undefined;
        this.addLocationTile(MapLocations.Scrolls, wUnit, hUnit, tilesPlacedCount, tilesPerRow, scrollAlertMessage);
        tilesPlacedCount++;

        // Add click zones
        this._locationTiles.forEach((tile) => {
            this._clickZones.push({
                location: tile.name,
                clickZone: tile.position
            });

            tilesPlacedCount++;
        }
        )
    }

    private static addLocationTile(
        tile: string,
        wUnit: number,
        hUnit: number,
        tilesPlacedCount: number,
        tilesPerRow: number,
        alertText: string | undefined = undefined): void {
        this._locationTiles.push(new MapTile(
            tile,
            new Rect(
                ((tilesPlacedCount % tilesPerRow) * (this._tileSize + this._tileGap) * wUnit) + this._canvasXOffset + this._outerPadding * wUnit,
                Math.floor(tilesPlacedCount / tilesPerRow) * (this._tileSize + this._tileGap) * hUnit + this._canvasYOffset + this._outerPadding * hUnit,
                this._tileSize * wUnit,
                this._tileSize * hUnit
            ),
            `./map/tile-${tile}.svg`,
            alertText
        ));
    }

    private static paintLocationTiles(ctx: CanvasRenderingContext2D) {
        this._locationTiles.forEach((tile) => {
            this.paintTile(ctx, tile);
        })
    }

    private static paintTile(ctx: CanvasRenderingContext2D, mapTile: MapTile, borderColour: string = GlobalStaticConstants.mediumColour) {
        // Don't draw tiles off-screen
        if (mapTile.position.y + mapTile.position.height > this._boundingRect.y + this._boundingRect.height) return;

        ctx.save();

        ctx.strokeStyle = borderColour;
        ctx.lineWidth = 4;

        const img = new Image();
        img.src = mapTile.backgroundImagePath;
        ctx.drawImage(img, mapTile.position.x, mapTile.position.y, mapTile.position.width, mapTile.position.height);
        ctx.strokeRect(mapTile.position.x, mapTile.position.y, mapTile.position.width, mapTile.position.height);

        if (!!mapTile.alertText) {
            const alertRadius = 20; // Adjust the radius as needed
            const alertX = mapTile.position.x + mapTile.position.width - alertRadius - 10; // Adjust position as needed
            const alertY = mapTile.position.y + alertRadius + 10; // Adjust position as needed

            ctx.fillStyle = '#D0312D';
            ctx.beginPath();
            ctx.arc(alertX, alertY, alertRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.font = 'bold 16pt Garamond';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(mapTile.alertText, alertX, alertY + 2);
        }

        ctx.restore();
    }

    private static getLocationTileByName(name: string) {
        const matches = this._locationTiles.filter((tile) => {
            return tile.name === name;
        });
        return matches.length >= 0 ? matches[0] : null;
    }

    private static loadUiTiles() {
    }
}

class MapLocations {
    public static None: string = "";
    public static Hire: string = "Hire";
    public static Gym: string = "Gym";
    public static Mystery: string = "Mystery";
    public static Race: string = "Race";
    public static Management: string = "Management";
    public static Scrolls: string = "Scrolls";
    public static Deal: string = "Deal";
    public static DealLocked: string = "DealLocked";
}

class UiElements {
    public static Money: string = "UiMoney";
    public static Calendar: string = "UiCalendar";
}

class MapTile {
    constructor(
        public name: string,
        public position: Rect,
        public backgroundImagePath: string,
        public alertText: string | undefined = undefined) { }
}

class Rect {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
    ) { }
}
