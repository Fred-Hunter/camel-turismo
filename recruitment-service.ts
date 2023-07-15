class RecruitmentService {
    constructor() {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.Recruitment);
        this._ctx = this._canvas.getContext('2d')!;
        this._camelCubeService = new CubeService(this._ctx);
        this.drawInitCanvas();
    }

    private readonly _canvas: HTMLCanvasElement;

    private readonly _ctx: CanvasRenderingContext2D;

    private readonly _camelCubeService: CubeService;

    private _recruitedCamel = false;

    handleEvent = () => {
        CanvasService.hideAllCanvas();
        MapOverview.showMap();
        MapOverview.renderMap();
        document.removeEventListener("redirectToMap", this.handleEvent);
    }

    leaveRecruitmentArea = () => {
        document.addEventListener(
            "redirectToMap",
            this.handleEvent,
            false,
          );
    }

    validateEnoughCashMoney(cost: number): boolean {
        return cashMoney - cost >= 0;
    }

    leaveRecruitmentAreaIfSuccessfulRecruitment = () => {
        if (this._recruitedCamel) {
            this._recruitedCamel = false;
            this.leaveRecruitmentArea();
        }
    }

    tryBuyCamel(cost: number) {
        if (!this.validateEnoughCashMoney(cost)) {
            PopupService.drawAlertPopup('Not enough cash money!');
            return;
        }
        cashMoney = cashMoney - cost;
        const quality: InitCamelQuality = cost/100 - 1;
        camel = new Camel(++lastUsedId, quality);
        PopupService.drawAlertPopup(`Recruited ${camel.name}!`);
        this._recruitedCamel = true;
    }

    spendHighCashMoney = () => {
        this.tryBuyCamel(300);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    }

    spendMediumCashMoney = () => {
        this.tryBuyCamel(200);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    }

    spendLowCashMoney = () => {
        this.tryBuyCamel(100);
        this.leaveRecruitmentAreaIfSuccessfulRecruitment();
    }

    drawInitCanvas(): void {
        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        let btnService = new CanvasBtnService(this._canvas);

        const radius = 25;

        btnService.drawBackButton();
        const btnWidth = 550;
        const btnHeight = 50;
        const camelCoords = (x: number, y: number) => ImportantService.ConvertRealToCoord(x + btnWidth / 2, y - btnHeight - 60, 40);

        let btnX = 240;
        let btnY = 250;
        let camel = camelCoords(btnX, btnY);
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, '#cc807a', '#f2ada7', '#fff', this.spendLowCashMoney, 'Recruit lowly camel - $100');
        this.drawCamel(camel.x2, camel.y2, '#cc807a');

        btnX = 840;
        btnY = 250;
        camel = camelCoords(btnX, btnY);
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, '#debb49', '#f5d671', '#fff', this.spendMediumCashMoney, 'Recruit mediocre camel - $200');
        this.drawCamel(camel.x2, camel.y2,'#debb49');

        btnX = 540;
        btnY = 650;
        camel = camelCoords(btnX, btnY);
        btnService.createBtn(btnX, btnY, btnWidth, btnHeight, radius, '#569929', '#7ac24a', '#fff', this.spendHighCashMoney, 'Recruit high camel - $300');
        this.drawCamel(camel.x2, camel.y2, '#509124');

        CashMoneyService.drawCashMoney(this._ctx);
    }

    drawCamel = (xCoord: number, yCoord: number, colour: string) => {
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 1.5, 0, -10);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 0, 0, -6);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 1, 0, -6);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 1, 0, -2);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 2, 0, -2);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 0, 0, 2);
        this._camelCubeService.drawCube(xCoord, yCoord, 40, colour, 1, 0, 2);
    }
}
