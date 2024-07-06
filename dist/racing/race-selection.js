import { CanvasBtnService } from "../global/canvas-btn-service.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { CashMoneyService } from "../global/cash-money-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalComponents } from "../global/global-components.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { PopupService } from "../global/popup-service.js";
import { Page } from "../navigation/page.js";
import { RaceType } from "./race-type.js";
import { StatisticsHelper } from "../statistics/statistics-helper.js";
import { Colour } from "../assets/colours.js";
export class RaceSelection {
    _navigator;
    _raceManagement;
    constructor(_navigator, _raceManagement) {
        this._navigator = _navigator;
        this._raceManagement = _raceManagement;
        this._canvas = CanvasService.getCanvasByName(CanvasNames.RaceSelection);
        this._ctx = this._canvas.getContext('2d');
        this._btnService = new CanvasBtnService(this._canvas);
    }
    _ctx;
    _canvas;
    _btnService;
    load() {
        CanvasService.showCanvas(CanvasNames.RaceSelection);
        this.drawSelectionScreen();
    }
    drawSelectionScreen() {
        this._btnService.removeEventListeners();
        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const radius = 25;
        const borderWidth = 5;
        const buttonWidth = 300;
        const buttonHeight = 65;
        const buttonListSpacing = buttonHeight + 20;
        const buttonFontSize = 20;
        const enterStreetRace = () => this.selectRace(40, 100, 0, 5, 20, RaceType.StreetRace);
        const enterWaterRace = () => this.selectRace(40, 200, 10, 5, 30, RaceType.WaterRace);
        const enterLocalDerby = () => this.selectRace(80, 500, 200, 8, 50, RaceType.LocalDerby);
        const enterCityShowdown = () => this.selectRace(80, 600, 250, 8, 60, RaceType.CityShowdown);
        const enterWorldCup = () => this.selectRace(100, 10000, 300, 15, 60, RaceType.WorldCup);
        const enterSpookyShowdown = () => this.selectRace(100, this.getShowdownLevel() * 8, this.getShowdownLevel() * 3, 1, this.getShowdownLevel(), RaceType.SpookyShowdown);
        const middleX = this._canvas.width / GlobalStaticConstants.devicePixelRatio / 2;
        const raceArray = [
            {
                race: enterStreetRace,
                colours: [Colour.pink, Colour.lightPink, Colour.white],
                name: "Street race",
                entry: 0,
                prize: 100,
            },
            {
                race: enterWaterRace,
                colours: [Colour.winter, Colour.lightWinter, Colour.white],
                name: "Water race",
                entry: 10,
                prize: 200,
            },
            {
                race: enterLocalDerby,
                colours: [Colour.yellow, Colour.lightYellow, Colour.white],
                name: "Local derby",
                entry: 200,
                prize: 500,
            },
            {
                race: enterCityShowdown,
                colours: [Colour.yellow, Colour.lightYellow, Colour.white],
                name: "City showdown",
                entry: 250,
                prize: 600,
            },
            {
                race: enterWorldCup,
                colours: [Colour.green, Colour.lightGreen, Colour.white],
                name: "World cup",
                entry: 300,
                prize: 800,
            },
            {
                race: enterSpookyShowdown,
                colours: [Colour.green, Colour.lightGreen, Colour.white],
                name: "Spooky showdown",
                entry: this.getShowdownLevel() * 3,
                prize: this.getShowdownLevel() * 8,
            },
        ];
        this._btnService.drawBackButton(Page.mapOverview);
        raceArray.forEach((config, i) => {
            this._btnService.createBtn(middleX - buttonWidth / 2, // X
            buttonListSpacing * (i + 1), // Y
            buttonWidth, buttonHeight, radius, borderWidth, config.colours[0], config.colours[1], config.colours[2], config.race, [`${config.name}`, `Entry $${config.entry} | Prize $${config.prize}`], buttonFontSize);
        });
        CashMoneyService.drawCashMoney(this._ctx);
    }
    selectRace(raceLength, prizeMoney, entryFee, raceSize, averageCompetitorLevel, raceType) {
        if (GameState.cashMoney < entryFee) {
            return;
        }
        if (GameState.cashMoney >= entryFee) {
            GameState.cashMoney -= entryFee;
            StatisticsHelper.LogCashMoneyChange(-entryFee);
        }
        PopupService.showLoading();
        // A few frames are needed to paint the loader
        window.setTimeout(() => {
            GlobalComponents.race = this._raceManagement.createRace(raceLength, prizeMoney, raceSize, averageCompetitorLevel, raceType);
            this._navigator.requestPageNavigation(Page.raceCamelSelect);
        }, 100);
    }
    getShowdownLevel() {
        const yourBestCamelLevel = Math.round(GameState.camels.map(c => c.levelAverage).sort((a, b) => b - a)[0]) ?? 90;
        return yourBestCamelLevel + 10;
    }
}
