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

        const enterStreetRace = () => this.selectRace(40, 100);
        const enterLocalDerby = () => this.selectRace(80, 500);
        const enterWorldCup = () => this.selectRace(120, 10000);

        btnService.createBtn(240, 250, 550, 50, radius, '#cc807a', '#f2ada7', '#fff', enterStreetRace, 'Street race - $0');

        btnService.createBtn(840, 250, 550, 50, radius, '#debb49', '#f5d671', '#fff', enterLocalDerby, 'Local derby - $200');

        btnService.createBtn(540, 650, 550, 50, radius, '#569929', '#7ac24a', '#fff', enterWorldCup, 'World cup - $300');

        CashMoneyService.drawCashMoney(this._ctx);
    }

    private selectRace(raceLength: number, prizeMoney: number) {
        race = raceSimulation.createRace(camel, raceLength, prizeMoney);
        document.dispatchEvent(startRace);
    }
}