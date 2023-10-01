class Startup {
    constructor() { }

    public registerComponents() {
        const racingStartup = new RacingStartup(globalServices);
        racingStartup.registerComponents();

        const managementStartup = new ManagementStartup(globalServices);
        managementStartup.registerComponents();

        const scrollsStartup = new ScrollsStartup(globalServices);
        scrollsStartup.registerComponents();

        recruitmentService = new RecruitmentService(globalServices.navigatorService, globalServices.camelCreator);
        loadingScreen = new LoadingScreen(globalServices.navigatorService);

        this.registerDebugComponents();
    }

    public registerAudio() {
        window.addEventListener('keydown', () => {
            globalServices.musicService.startAudio();
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
        CanvasService.createCanvas('0', CanvasNames.CalendarDetails);
        CanvasService.createCanvas('9', CanvasNames.Debug);
    }

    public createGlobalServices(): GlobalServices {
        const navigatorService = new NavigatorService();
        const musicService = new MusicService();

        const camelPropertyGenerator = new CamelPropertyGenerator();
        const levelCurveFactor = new LevelCurveFactory();
        const camelSkillCreator = new CamelSkillCreator(levelCurveFactor);
        const camelCreator = new CamelCreator(camelPropertyGenerator, camelSkillCreator);

        return {
            musicService,
            navigatorService,
            camelCreator
        }
    }

    public registerDebugComponents() {
        const canvas = CanvasService.getCanvasByName(CanvasNames.Debug);
        const cubeService = new CubeService(canvas.getContext("2d")!);
        const btnService = new CanvasBtnService(canvas, globalServices.navigatorService);
        
        isometricEditorComponent = new IsometricEditorComponent(canvas, cubeService, btnService);
    }
}