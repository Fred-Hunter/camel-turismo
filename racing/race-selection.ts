class RaceSelection {
    constructor(
    ) {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.RaceSelection);
        this._ctx = this._canvas.getContext('2d')!;
    }

    private readonly _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;


    drawSelectionScreen() {
        const btnService = new CanvasBtnService(this._canvas);

        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        const radius = 25;

        const enterStreetRace = () => this.selectRace(40, 100, 0, 5);
        const enterLocalDerby = () => this.selectRace(80, 500, 200, 8);
        const enterWorldCup = () => this.selectRace(120, 10000, 300, 15);

        const middleX = this._canvas.width / window.devicePixelRatio / 2;
        const middleY = this._canvas.height / window.devicePixelRatio / 2;

        btnService.createBtn(middleX - 400, middleY / 2, 800, 50, radius, '#cc807a', '#f2ada7', '#fff', enterStreetRace, 'Street race | Entry $0 | Prize $100');

        btnService.createBtn(middleX - 400, middleY, 800, 50, radius, '#debb49', '#f5d671', '#fff', enterLocalDerby, 'Local derby | Entry $200 | Prize $500');

        btnService.createBtn(middleX - 400, middleY * 4 / 3, 800, 50, radius, '#569929', '#7ac24a', '#fff', enterWorldCup, 'World cup | Entry $300 | Prize $10000');

        CashMoneyService.drawCashMoney(this._ctx);
    }

    private selectRace(
        raceLength: number, 
        prizeMoney: number, 
        entryFee: number,
        raceSize: number) {
        if (cashMoney >= entryFee) {
            cashMoney -= prizeMoney;
        }

        race = raceSimulation.createRace(camel, raceLength, prizeMoney, raceSize);
        document.dispatchEvent(startRace);
    }
}