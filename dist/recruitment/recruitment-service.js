import { CanvasBtnService } from "../global/canvas-btn-service";
import { CanvasCamelService } from "../global/canvas-camel-service";
import { CanvasNames } from "../global/canvas-names";
import { CanvasService } from "../global/canvas-service";
import { CashMoneyService } from "../global/cash-money-service";
import { CubeService } from "../global/cube-service";
import { GameState } from "../global/game-state";
import { GlobalStaticConstants } from "../global/global-static-constants";
import { PopupService } from "../global/popup-service";
import { MapOverview } from "../map/map-overview";
import { Page } from "../navigation/page";
import { GeneralWasteScrolls } from "../scrolls/library/general-waste";
import { MerchantIceScrolls } from "../scrolls/library/merchant-ice";
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
        GameState.cashMoney = GameState.cashMoney - cost;
        const quality = cost / 100;
        GameState.camel = this._camelCreator.createRandomCamelWithQuality(quality);
        ;
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
        const btnService = new CanvasBtnService(this._canvas, this._navigator);
        const camelService = new CanvasCamelService(this._ctx);
        const radius = 25;
        btnService.drawBackButton(Page.mapOverview);
        const camelSize = Math.round(GlobalStaticConstants.baseCubeSize * 4 / 5);
        const btnWidth = 550;
        const btnHeight = 50;
        const borderWidth = 5;
        let btnX = 240;
        let btnY = 250;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, '#cc807a', '#f2ada7', '#fff', this.spendLowCashMoney, ['Recruit lowly camel - $100']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#cc807a');
        btnX = 840;
        btnY = 250;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, '#debb49', '#f5d671', '#fff', this.spendMediumCashMoney, ['Recruit mediocre camel - $200']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#debb49');
        btnX = 540;
        btnY = 650;
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, borderWidth, '#569929', '#7ac24a', '#fff', this.spendHighCashMoney, ['Recruit high camel - $300']);
        camelService.drawCamelScreenCoords(btnX + btnWidth / 2, btnY - btnHeight - 60, camelSize, '#509124');
        CashMoneyService.drawCashMoney(this._ctx);
    }
}
