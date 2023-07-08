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

    leaveRecruitmentArea(): void {
        this._canvas.style.zIndex = '-1';
    }

    onclickFn(): void {
        alert('camel recruited');
    }

    drawInitCanvas(): void {
        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this._ctx.fillStyle = '#e8d7a7';
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        let btnService = new CanvasBtnService(this._canvas);

        btnService.createBtn(100,100,400,100,'#fff','#246',this.onclickFn,'Recruit camel');
    }
}