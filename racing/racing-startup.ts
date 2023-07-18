class RacingStartup {
    constructor(
        private readonly _musicService: MusicService,
        private readonly _navigatorService: NavigatorService
        ) { }

    public registerComponents() {
        const raceSimulation = new RaceSimulation();
        const raceManagement = new RaceManagement(this._musicService, raceSimulation);
        
        this.registerRaceCamelSelectComponent(raceManagement);
        this.registerRaceSelection(raceManagement);
        this.registerRaceComponent(raceManagement);
    }

    private registerRaceCamelSelectComponent(raceManagement: RaceManagement) {
        const selectRaceCamelFunc = (camel: Camel) => {
            GameState.camel = camel;
            raceManagement.addCamelToRace(camel, race);

            this._navigatorService.requestPageNavigation(Page.race)
            this._musicService.setAudio("RaceAudio");
            this._musicService.startAudio()

            race.raceState = RaceState.triggered;
        };

        raceCamelSelectComponent = new CamelSelectComponent(selectRaceCamelFunc);
    }

    private registerRaceSelection(raceManagement: RaceManagement) {
        raceSelection = new RaceSelection(this._navigatorService, raceManagement);
    }

    private registerRaceComponent(raceManagement: RaceManagement) {
        const leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d")!);
        const raceDrawing = new RaceDrawing();
        const countdown = new Countdown();

        raceComponent = new RaceComponent(raceDrawing, raceManagement, leaderboardService, countdown);
    }
}