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
        this._ctx.fillStyle = '#e8d7a7';
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        let btnService = new CanvasBtnService(this._canvas);

        btnService.createBtn(100, 100, 500, 100, '#fff', '#246', this.spendLowCashMoney, 'Recruit low camel');
        this.drawCamel(-5, 4, '#cc807a');

        btnService.createBtn(700, 100, 500, 100, '#fff', '#246', this.spendMediumCashMoney, 'Recruit medium camel');
        this.drawCamel(1, -2, '#debb49');

        btnService.createBtn(350, 400, 500, 100, '#fff', '#246', this.spendHighCashMoney, 'Recruit high camel');
        this.drawCamel(3.5, 7.5, '#509124');
    }

    drawCamel = (xCoord: number, yCoord: number, colour: string) => {
        this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 1.5, 0, -3);
        this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 0, 0, -2);
        this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 1, 0, -2);
        this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 1, 0, -1);
        this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 2, 0, -1);
        this._camelCubeService.drawCube(xCoord, yCoord, 10, colour);
        this._camelCubeService.drawCube(xCoord, yCoord, 10, colour, 1);
    }
}
