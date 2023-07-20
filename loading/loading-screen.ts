class LoadingScreen {
    constructor(private readonly _navigator: NavigatorService) {
        this._canvas = CanvasService.getCanvasByName(CanvasNames.LoadingScreen);
        this._btnService = new CanvasBtnService(this._canvas, this._navigator);
    }

    private _canvas: HTMLCanvasElement;
    private _btnService: CanvasBtnService;

    private startFreshGame = () => {
        GameState.Reset();
        this._navigator.requestPageNavigation(
            Page.mapOverview, 
            () => PopupService.drawAlertPopup("Welcome to Private Bates' Camel Turismo Management 2024!"));
    }

    private loadSavedGame = () => {
        GameState.LoadIfExists();
        this._navigator.requestPageNavigation(
            Page.mapOverview, 
            () => PopupService.drawAlertPopup("Welcome back to Private Bates' Camel Turismo Management 2024!"));
    }

    drawLoadingScreen() {
        const ctx = this._canvas.getContext("2d")!;

        const img = new Image();
        img.src = './graphics/camel-oasis.jpg';
        ctx.drawImage(img, 0, 0, GlobalStaticConstants.innerWidth, GlobalStaticConstants.innerHeight);

        const radius = 50;
        const borderWidth = 5;

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
                borderWidth,
                backgroundColour,
                borderColour,
                textColour,
                this.startFreshGame,
                ['New game']);
            
            this._btnService.createBtn(
                7*GlobalStaticConstants.innerWidth/12,
                8*GlobalStaticConstants.innerHeight/10,
                GlobalStaticConstants.innerWidth/4,
                GlobalStaticConstants.innerHeight/10,
                radius,
                borderWidth,
                backgroundColour,
                borderColour,
                textColour,
                this.loadSavedGame,
                ['Load saved game']);
        } else {
            this._btnService.createBtn(
                GlobalStaticConstants.innerWidth/3,
                8*GlobalStaticConstants.innerHeight/10,
                GlobalStaticConstants.innerWidth/3,
                GlobalStaticConstants.innerHeight/10,
                radius,
                borderWidth,
                backgroundColour,
                borderColour,
                textColour,
                this.startFreshGame,
                ['New game']);
        }
    }
}