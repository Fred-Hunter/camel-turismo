class RaceSelection {
    constructor(
        private readonly _navigator: NavigatorService,
        private readonly _raceSimulation: RaceSimulation
    ) {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.RaceSelection);
        this._ctx = this._canvas.getContext('2d')!;
        this._btnService = new CanvasBtnService(this._canvas, this._navigator);
    }

    private readonly _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _btnService: CanvasBtnService;

    load() {
        CanvasService.showCanvas(CanvasNames.RaceSelection);
        this.drawSelectionScreen();
    }


    drawSelectionScreen() {
        this._btnService.removeEventListeners();

        this._ctx.fillStyle = GlobalStaticConstants.backgroundColour;
        this._ctx.fillRect(0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        const radius = 25;

        const enterStreetRace = () => this.selectRace(40, 100, 0, 5, Difficulty.Easy);
        const enterLocalDerby = () => this.selectRace(80, 500, 200, 8, Difficulty.Normal);
        const enterWorldCup = () => this.selectRace(100, 10000, 300, 15, Difficulty.Hard);

        const middleX = this._canvas.width / GlobalStaticConstants.devicePixelRatio / 2;
        const middleY = this._canvas.height / GlobalStaticConstants.devicePixelRatio / 2;

        this._btnService.drawBackButton(Page.mapOverview);

        this._btnService.createBtn(middleX - 400, middleY / 2, 800, 50, radius, '#cc807a', '#f2ada7', '#fff', enterStreetRace, 'Street race | Entry $0 | Prize $100');

        this._btnService.createBtn(middleX - 400, middleY, 800, 50, radius, '#debb49', '#f5d671', '#fff', enterLocalDerby, 'Local derby | Entry $200 | Prize $500');

        this._btnService.createBtn(middleX - 400, middleY * 4 / 3, 800, 50, radius, '#569929', '#7ac24a', '#fff', enterWorldCup, 'World cup | Entry $300 | Prize $10000');

        CashMoneyService.drawCashMoney(this._ctx);
    }

    private selectRace(
        raceLength: number,
        prizeMoney: number,
        entryFee: number,
        raceSize: number,
        difficulty: Difficulty) {

        if (GameState.cashMoney < entryFee) {
            return;
        }

        if (GameState.cashMoney >= entryFee) {
            GameState.cashMoney -= entryFee;
        }

        PopupService.showLoading();

        // A few frames are needed to paint the loader
        window.setTimeout(() => {
            race = this._raceSimulation.createRace(GameState.camel!, raceLength, prizeMoney, raceSize, difficulty);
            this._navigator.requestPageNavigation(Page.raceCamelSelect);
        }, 100);

    }
}