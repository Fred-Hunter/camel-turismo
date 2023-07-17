class RacingStartup {
    constructor(
        private readonly _musicService: MusicService,
        private readonly _navigatorService: NavigatorService
        ) { }

    public registerComponents() {
        const raceSimulation = new RaceSimulation(this._musicService);
        
        this.registerRaceCamelSelectComponent();
        this.registerRaceSelection(raceSimulation);
        this.registerRaceComponent(raceSimulation);
    }

    private registerRaceCamelSelectComponent() {
        const selectRaceCamelFunc = (camel: Camel) => {
            this._navigatorService.requestPageNavigation(Page.race)
            this._musicService.setAudio("RaceAudio");
            this._musicService.startAudio()

            race.triggered = true;
        };

        raceCamelSelectComponent = new CamelSelectComponent(selectRaceCamelFunc);
    }

    private registerRaceSelection(raceSimulation: RaceSimulation) {
        raceSelection = new RaceSelection(this._navigatorService, raceSimulation);
    }

    private registerRaceComponent(raceSimulation: RaceSimulation) {
        const leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d")!);
        const raceDrawing = new RaceDrawing();
        const countdown = new Countdown();

        raceComponent = new RaceComponent(raceDrawing, raceSimulation, leaderboardService, countdown);
    }
}