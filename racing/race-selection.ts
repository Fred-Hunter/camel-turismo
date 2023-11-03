import { CanvasBtnService } from "../global/canvas-btn-service.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { CashMoneyService } from "../global/cash-money-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalComponents } from "../global/global-components.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { PopupService } from "../global/popup-service.js";
import { NavigatorService } from "../navigation/navigator-service.js";
import { Page } from "../navigation/page.js";
import { Difficulty } from "./difficulty.js";
import { RaceManagement } from "./race-managment.js";

export class RaceSelection {
    constructor(
        private readonly _navigator: NavigatorService,
        private readonly _raceManagement: RaceManagement
    ) {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.RaceSelection);
        this._ctx = this._canvas.getContext('2d')!;
        this._btnService = new CanvasBtnService(this._canvas, this._navigator);
    }

    private readonly _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _btnService: CanvasBtnService;

    load() {
        CanvasService.showCanvas(CanvasNames.RaceSelection);
        this.drawSelectionScreen();
    }


    drawSelectionScreen() {
        this._btnService.removeEventListeners();

        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        const ratio = GlobalStaticConstants.devicePixelRatio / 2;

        const radius = 25;
        const borderWidth = 5;
        const buttonWidth = 300;
        const buttonHeight = 65;
        const buttonListSpacing = buttonHeight + 20;
        const buttonFontSize = 20;

        const enterStreetRace = () => this.selectRace(40, 100, 0, 5, Difficulty.Easy);
        const enterLocalDerby = () => this.selectRace(80, 500, 200, 8, Difficulty.Normal);
        const enterWorldCup = () => this.selectRace(100, 10000, 300, 15, Difficulty.Hard);

        const middleX = this._canvas.width / GlobalStaticConstants.devicePixelRatio / 2;

        const raceArray: { race: () => void; colours: [string, string, string]; name: string; entry: number; prize: number }[] = [
            {
                race: enterStreetRace,
                colours: ['#cc807a', '#f2ada7', '#fff'],
                name: "Street race",
                entry: 0,
                prize: 100,
             },
            {
                race: enterLocalDerby,
                colours: ['#debb49', '#f5d671', '#fff'],
                name: "Local derby",
                entry: 200,
                prize: 500,
             },
            {
                race: enterWorldCup,
                colours: ['#569929', '#7ac24a', '#fff'],
                name: "World cup",
                entry: 300,
                prize: 800,
             },
        ];

        this._btnService.drawBackButton(Page.mapOverview);

        raceArray.forEach((config, i) => {
            this._btnService.createBtn(
                    middleX - buttonWidth / 2, // X
                    buttonListSpacing * (i + 1), // Y
                    buttonWidth,
                    buttonHeight,
                    radius,
                    borderWidth,
                    config.colours[0],
                    config.colours[1],
                    config.colours[2],
                    config.race,
                    [`${config.name}`, `Entry $${config.entry} | Prize $${config.entry}`],
                    buttonFontSize);
        });

        CashMoneyService.drawCashMoney(this._ctx);
    }

    private selectRace(
        raceLength: number,
        prizeMoney: number,
        entryFee: number,
        raceSize: number,
        difficulty: Difficulty) {

        if (GameState.cashMoney < entryFee) {
            return;
        }

        if (GameState.cashMoney >= entryFee) {
            GameState.cashMoney -= entryFee;
        }

        PopupService.showLoading();

        // A few frames are needed to paint the loader
        window.setTimeout(() => {
            GlobalComponents.race = this._raceManagement.createRace(raceLength, prizeMoney, raceSize, difficulty);
            this._navigator.requestPageNavigation(Page.raceCamelSelect);
        }, 100);

    }
}
