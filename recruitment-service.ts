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

    goToRecruitmentArea(): void {
        this._canvas.style.zIndex = '99';
    }

    leaveRecruitmentArea = () => {
        this._canvas.style.zIndex = '-1';
        document.dispatchEvent(startRace);
    }

    validateEnoughCashMoney(cost: number): boolean {
        return cashMoney - cost >= 0;
    }

    leaveRecruitmentAreaIfSuccessfulRecruitment = () => {
        if (this._recruitedCamel) {
            camel = new Camel(++lastUsedId, InitCamelQuality.High);
            this.leaveRecruitmentArea();
        }
    }

    tryBuyCamel(cost: number) {
        if (camel !== undefined && camel !== null) {
            // todo: change camels/allow more than one
            alert ('Already recruited a camel!');
            return;
        }
        if (!this.validateEnoughCashMoney(cost)) {
            alert('Not enough cash money!');
            return;
        }
        cashMoney = cashMoney - cost;
        alert('Recruited camel!');
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

        btnService.createBtn(240, 250, 395, 50, radius, '#cc807a', '#f2ada7', '#fff', this.spendLowCashMoney, 'Recruit low camel');
        this.drawCamel(-3.25, 4.25, '#cc807a');

        btnService.createBtn(840, 250, 395, 50, radius, '#debb49', '#f5d671', '#fff', this.spendMediumCashMoney, 'Recruit medium camel');
        this.drawCamel(2.75, -1.75, '#debb49');

        btnService.createBtn(540, 650, 395, 50, radius, '#569929', '#7ac24a', '#fff', this.spendHighCashMoney, 'Recruit high camel');
        this.drawCamel(7.75, 9.25, '#509124');

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
