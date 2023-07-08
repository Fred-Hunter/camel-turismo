class RecruitmentService {
    constructor() {
        this._canvas = CanvasService.getCanvasByName(this._canvasId);
        this._ctx = this._canvas.getContext('2d')!;
        this.drawInitCanvas();
    }

    private readonly _canvasId = 'recruitmentCanvas';

    private readonly _canvas: HTMLCanvasElement;

    private readonly _ctx: CanvasRenderingContext2D;

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

        btnService.createBtn(100, 100, 400, 100, '#fff', '#246', this.spendLowCashMoney, 'Recruit low camel');
        btnService.createBtn(600, 100, 400, 100, '#fff', '#246', this.spendMediumCashMoney, 'Recruit medium camel');
        btnService.createBtn(350, 400, 400, 100, '#fff', '#246', this.spendHighCashMoney, 'Recruit high camel');
    }
}
