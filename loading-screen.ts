class LoadingScreen {
    constructor() {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.LoadingScreen);
        this._btnService = new CanvasBtnService(this._canvas);
    }

    private _canvas: HTMLCanvasElement;
    private _btnService: CanvasBtnService;

    private startFreshGame() {
        GameState.Reset();
        initMapLoadRequested = true;
    }

    private loadSavedGame() {
        GameState.LoadIfExists();
        initMapLoadRequested = true;
    }

    drawLoadingScreen() {
        const ctx = this._canvas.getContext("2d")!;

        const img = new Image();
        img.src = './graphics/camel-oasis.jpg';
        ctx.drawImage(img, 0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        const radius = 50;

        const backgroundColour = '#cc807a';
        const borderColour = '#f2ada7';
        const textColour = '#fff';

        if (GameState.GetExists()) {
            this._btnService.createBtn(
                GlobalStaticConstants.innerWidth/6,
                8*GlobalStaticConstants.innerHeight/10,
                GlobalStaticConstants.innerWidth/4,
                GlobalStaticConstants.innerHeight/10,
                radius,
                backgroundColour,
                borderColour,
                textColour,
                this.startFreshGame,
                'New game');
            
            this._btnService.createBtn(
                7*GlobalStaticConstants.innerWidth/12,
                8*GlobalStaticConstants.innerHeight/10,
                GlobalStaticConstants.innerWidth/4,
                GlobalStaticConstants.innerHeight/10,
                radius,
                backgroundColour,
                borderColour,
                textColour,
                this.loadSavedGame,
                'Load saved game');
        } else {
            this._btnService.createBtn(
                GlobalStaticConstants.innerWidth/3,
                8*GlobalStaticConstants.innerHeight/10,
                GlobalStaticConstants.innerWidth/3,
                GlobalStaticConstants.innerHeight/10,
                radius,
                backgroundColour,
                borderColour,
                textColour,
                this.startFreshGame,
                'New game');
        }
    }
}