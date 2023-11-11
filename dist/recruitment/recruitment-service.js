import { CanvasBtnService } from "../global/canvas-btn-service.js";
import { CanvasCamelService } from "../global/canvas-camel-service.js";
import { CanvasNames } from "../global/canvas-names.js";
import { CanvasService } from "../global/canvas-service.js";
import { CashMoneyService } from "../global/cash-money-service.js";
import { CubeService } from "../global/cube-service.js";
import { GameState } from "../global/game-state.js";
import { GlobalStaticConstants } from "../global/global-static-constants.js";
import { PopupService } from "../global/popup-service.js";
import { MapOverview } from "../map/map-overview.js";
import { Page } from "../navigation/page.js";
import { GeneralWasteScrolls } from "../scrolls/library/general-waste.js";
import { MerchantIceScrolls } from "../scrolls/library/merchant-ice.js";
import { StatisticsHelper } from "../statistics/statistics-helper.js";
import { Colour, ColourCodes } from "../assets/colours.js";
export class RecruitmentService {
    _navigator;
    _camelCreator;
    constructor(_navigator, _camelCreator) {
        this._navigator = _navigator;
        this._camelCreator = _camelCreator;
        this._canvas = CanvasService.getCanvasByName(CanvasNames.Recruitment);
        this._ctx = this._canvas.getContext('2d');
        this._camelCubeService = new CubeService(this._ctx);
        this.drawInitCanvas();
    }
    _canvas;
    _ctx;
    _camelCubeService;
    _recruitedCamel = false;
    handleEvent = () => {
        CanvasService.hideAllCanvas();
        MapOverview.load();
        document.removeEventListener("redirectToMap", this.handleEvent);
    };
    leaveRecruitmentArea = () => {
        document.addEventListener("redirectToMap", this.handleEvent, false);
    };
    validateEnoughCashMoney(cost) {
        return GameState.cashMoney - cost >= 0;
    }
    leaveRecruitmentAreaIfSuccessfulRecruitment = () => {
        if (this._recruitedCamel) {
            this._recruitedCamel = false;
            this.leaveRecruitmentArea();
        }
    };
    tryBuyCamel(cost) {
        if (!this.validateEnoughCashMoney(cost)) {
            PopupService.drawAlertPopup('Not enough cash money!');
            return;
        }
        GameState.cashMoney -= cost;
        StatisticsHelper.LogCashMoneyChange(-cost);
        const quality = cost / 100;
        GameState.camel = this._camelCreator.createRandomCamelWithQuality(quality);
        GameState.camels.push(GameState.camel);
        PopupService.drawAlertPopup(`Recruited ${GameState.camel.name}!`);
        this._recruitedCamel = true;
        GameState.scrolls.push(MerchantIceScrolls.getCamelPurchase(GameState.camel));
        if (GameState.camels.length === 1) {
            GameState.scrolls.push(GeneralWasteScrolls.welcome);
        }
    }
    spendHighCashMoney = () => {
        this.tryBuyCamel(300);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    spendMediumCashMoney = () => {
        this.tryBuyCamel(200);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    spendLowCashMoney = () => {
        this.tryBuyCamel(100);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    };
    drawInitCanvas() {
        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);
        const btnService = new CanvasBtnService(this._canvas);
        const camelService = new CanvasCamelService(this._ctx);
        const radius = 25;
        btnService.drawBackButton(Page.mapOverview);
        const camelSize = 4 / 5;
        const btnWidth = 550;
        const btnHeight = 50;
        const borderWidth = 5;
        const btnGap = 100;
        let btnX = 240;
        let btnY = 250;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, Colour.pink, Colour.lightPink, Colour.white, this.spendLowCashMoney, ['Recruit lowly camel - $100']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - btnGap, camelSize, ColourCodes.getCode(Colour.pink));
        btnX = 840;
        btnY = 250;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, Colour.yellow, Colour.lightYellow, Colour.white, this.spendMediumCashMoney, ['Recruit mediocre camel - $200']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - btnGap, camelSize, ColourCodes.getCode(Colour.yellow));
        btnX = 540;
        btnY = 650;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, Colour.spring, Colour.lightSpring, Colour.white, this.spendHighCashMoney, ['Recruit high camel - $300']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - btnGap, camelSize, ColourCodes.getCode(Colour.spring));
        CashMoneyService.drawCashMoney(this._ctx);
    }
}
