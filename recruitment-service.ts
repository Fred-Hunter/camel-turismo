class RecruitmentService {
    constructor() {
        this._canvas = CanvasService.getCanvasByName(this._canvasId);
        this._ctx = this._canvas.getContext('2d')!;
        this._camelCubeService = new CubeService(this._ctx);
        this.drawInitCanvas();
    }

    private readonly _canvasId = 'recruitmentCanvas';

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

        const radius = 25;

        btnService.createBtn(100, 100, 475, 100, radius, '#cc807a', '#f2ada7', '#fff', this.spendLowCashMoney, 'Recruit low camel');
        this.drawCamel(-5, 4, '#cc807a');

        btnService.createBtn(700, 100, 475, 100, radius, '#debb49', '#f5d671', '#fff', this.spendMediumCashMoney, 'Recruit medium camel');
        this.drawCamel(1, -2, '#debb49');

        btnService.createBtn(375, 400, 475, 100, radius, '#569929', '#7ac24a', '#fff', this.spendHighCashMoney, 'Recruit high camel');
        this.drawCamel(3.75, 7.25, '#509124');
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
