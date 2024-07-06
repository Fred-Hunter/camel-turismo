import { Colour } from "../assets/colours.js";
import { CanvasBtnService } from "../global/canvas-btn-service.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { PopupService } from "../global/popup-service.js";
import { Page } from "../navigation/page.js";
import { EmmaDaleScrolls } from "../scrolls/library/emma-dale.js";
export class LoadingScreen {
    _navigator;
    constructor(_navigator) {
        this._navigator = _navigator;
        this._canvas = CanvasService.getCanvasByName(CanvasNames.LoadingScreen);
        this._btnService = new CanvasBtnService(this._canvas);
    }
    _canvas;
    _btnService;
    startFreshGame = () => {
        GameState.Reset();
        GameState.scrolls.push(EmmaDaleScrolls.welcome);
        this._navigator.requestPageNavigation(Page.mapOverview, () => PopupService.drawAlertPopup("Welcome to Private Bates' Camel Turismo Management 2024!"));
    };
    loadSavedGame = () => {
        GameState.LoadIfExists();
        this._navigator.requestPageNavigation(Page.mapOverview, () => PopupService.drawAlertPopup("Welcome back to Private Bates' Camel Turismo Management 2024!"));
    };
    drawLoadingScreen() {
        const ctx = this._canvas.getContext("2d");
        const img = new Image();
        img.src = './graphics/camel-oasis.jpg';
        ctx.drawImage(img, 0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        this.drawVersionNumber(ctx);
        const radius = 50;
        const borderWidth = 5;
        const backgroundColour = Colour.pink;
        const borderColour = Colour.lightPink;
        const textColour = Colour.white;
        if (GameState.GetExists()) {
            this._btnService.createBtn(GlobalStaticConstants.innerWidth / 6, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 4, GlobalStaticConstants.innerHeight / 10, radius, borderWidth, backgroundColour, borderColour, textColour, this.startFreshGame, ['New game']);
            this._btnService.createBtn(7 * GlobalStaticConstants.innerWidth / 12, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 4, GlobalStaticConstants.innerHeight / 10, radius, borderWidth, backgroundColour, borderColour, textColour, this.loadSavedGame, ['Load saved game']);
        }
        else {
            this._btnService.createBtn(GlobalStaticConstants.innerWidth / 3, 8 * GlobalStaticConstants.innerHeight / 10, GlobalStaticConstants.innerWidth / 3, GlobalStaticConstants.innerHeight / 10, radius, borderWidth, backgroundColour, borderColour, textColour, this.startFreshGame, ['New game']);
        }
    }
    drawVersionNumber(ctx) {
        // const version = `v0.${GameState.version}.${data.lastCommitNumber} ${data.lastCommitTime.replaceAll("'","")}`;
        const version = `v0.${GameState.version}`;
        ctx.save();
        const versionHeight = 25;
        ctx.font = `${versionHeight}px Garamond`;
        ctx.fillStyle = GlobalStaticConstants.highlightColour;
        const versionWidth = ctx.measureText(version).width;
        ctx.fillText(version, this._canvas.width - versionWidth, this._canvas.height);
        ctx.restore();
    }
}
