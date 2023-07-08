class RecruitmentService {
    constructor(public canvasService: CanvasService, zIndex: number = -1) {
        this._canvas = canvasService.getCanvas(zIndex.toString(), this._canvasId);
        this._ctx = this._canvas.getContext('2d')!;
        this.drawInitCanvas();
    }

    private readonly _canvasId = 'recruitmentCanvas';

    private readonly _canvas: HTMLCanvasElement;

    private readonly _ctx: CanvasRenderingContext2D;

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
    }

    spendHighCashMoney = () => {
        this.tryBuyCamel(300);
        camel = new Camel(++lastUsedId, InitCamelQuality.High);
        this.leaveRecruitmentArea();
    }

    spendMediumCashMoney = () => {
        this.tryBuyCamel(200);
        camel = new Camel(++lastUsedId, InitCamelQuality.Medium);
        this.leaveRecruitmentArea();
    }

    spendLowCashMoney = () => {
        this.tryBuyCamel(100);
        camel = new Camel(++lastUsedId, InitCamelQuality.Low);
        this.leaveRecruitmentArea();
    }

    drawInitCanvas(): void {
        this._ctx.fillStyle = '#e8d7a7';
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        let btnService = new CanvasBtnService(this._canvas);

        btnService.createBtn(100, 100, 400, 100, '#fff', '#246', this.spendLowCashMoney, 'Recruit low camel');
        btnService.createBtn(600, 100, 400, 100, '#fff', '#246', this.spendMediumCashMoney, 'Recruit medium camel');
        btnService.createBtn(350, 400, 400, 100, '#fff', '#246', this.spendHighCashMoney, 'Recruit high camel');
    }
}