class Startup {
    constructor(
        private readonly _musicService: MusicService,
        private readonly _navigatorService: NavigatorService
        ) { }

    public registerComponents() {
        const racingStartup = new RacingStartup(this._musicService, this._navigatorService);
        racingStartup.registerComponents();

        const managementStartup = new ManagementStartup(this._musicService, this._navigatorService);
        managementStartup.registerComponents();

        recruitmentService = new RecruitmentService(navigatorService);
        loadingScreen = new LoadingScreen(navigatorService);
    }

    public registerAudio() {
        window.addEventListener('keydown', () => {
            this._musicService.startAudio();
        })
    }

    public createCanvases() {
        CanvasService.createCanvas('3', CanvasNames.Recruitment);
        CanvasService.createCanvas('1', CanvasNames.RaceBackground);
        CanvasService.createCanvas('2', CanvasNames.RaceCamel);
        CanvasService.createCanvas('4', CanvasNames.MapOverview);
        CanvasService.createCanvas('1', CanvasNames.GymCamel);
        CanvasService.createCanvas('0', CanvasNames.GymBackground);
        CanvasService.createCanvas('0', CanvasNames.PopupCanvas);
        CanvasService.createCanvas('5', CanvasNames.RaceSelection);
        CanvasService.createCanvas('6', CanvasNames.Countdown);
        CanvasService.createCanvas('7', CanvasNames.CamelManagement);
        CanvasService.createCanvas('8', CanvasNames.LoadingScreen);
    }
}