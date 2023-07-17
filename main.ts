// Recruitment
let camel: Camel;
let recruitmentService: RecruitmentService;

// Navigation
let navigatorService: NavigatorService;

// Race
let raceSimulation: RaceSimulation;
let raceSelection: RaceSelection;
let raceDrawing: RaceDrawing;
let gymDrawing: GymDrawing;
let race: Race;
let countdown: Countdown;
let raceTriggeredTimestamp: number;
let initMapLoadRequested = false;

let leaderboardService: LeaderboardService;

// Audio
let musicService: MusicService;

// Camel management
let camelSkillDrawing: CamelSkillDrawing;
let camelSkillCommands: CamelSkillCommands;
let camelSkillComponent: CamelSkillComponent;
let raceCamelSelectComponent: CamelSelectComponent;

// Loading
let loadingScreen: LoadingScreen;


function init() {
    GameState.cashMoney = 100;

    navigatorService = new NavigatorService();

    // Camel
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

    recruitmentService = new RecruitmentService(navigatorService);
    loadingScreen = new LoadingScreen(navigatorService);

    // Race
    raceDrawing = new RaceDrawing();
    raceSimulation = new RaceSimulation();
    raceSelection = new RaceSelection(navigatorService);
    countdown = new Countdown();

    const selectRaceCamelFunc = (camel: Camel) => {

        navigatorService.requestPageNavigation(Page.race)
        musicService.setAudio("RaceAudio");
        musicService.startAudio()

        race.triggered = true;
    };

    raceCamelSelectComponent = new CamelSelectComponent(selectRaceCamelFunc);

    leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d")!);

    // Gym
    gymDrawing = new GymDrawing(navigatorService);


    // Audio
    musicService = new MusicService();
    window.addEventListener('keydown', () => {
        musicService.startAudio();
    })

    // Camel management
    camelSkillDrawing = new CamelSkillDrawing(navigatorService);
    camelSkillCommands = new CamelSkillCommands();
    camelSkillComponent = new CamelSkillComponent(camelSkillDrawing, camelSkillCommands);

    navigatorService.doNavigation();

    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp: number) {
    try {
        GameState.secondsPassed = Math.min((timeStamp - GameState.oldTimeStamp) / 1000, 0.1);
        GameState.oldTimeStamp = timeStamp;

        if (initMapLoadRequested) {
            initMapLoadRequested = false;

            // Map
            CanvasService.hideAllCanvas();
            MapOverview.showMap();
            MapOverview.renderMap();

            if (!camel) {
                PopupService.drawAlertPopup("Welcome to Private Bates' Camel Turismo Management 2024!");
            }
            else {
                PopupService.drawAlertPopup("Welcome back to Private Bates' Camel Turismo Management 2024!");
            }
        }

        navigatorService.doNavigation();

        if (!!race && race.inProgress) {
            raceSimulation.simulateRaceStep(race);
            raceDrawing.drawCamels(race);
            leaderboardService.drawLeaderboard();
        }

        if (!!race && race.triggered) {
            if (!race.initialised) {
                raceDrawing.drawRaceCourse(race);
                raceTriggeredTimestamp = timeStamp;
                raceDrawing.drawCamels(race);
                race.initialised = true;
            }

            countdown.displayCountdown(8000 - (timeStamp - raceTriggeredTimestamp));

            if (timeStamp - raceTriggeredTimestamp >= 7500) {
                CanvasService.hideCanvas(CanvasNames.Countdown);
                race.triggered = false
                raceSimulation.startRace(race);
            }
        }
    } catch (exception) {
        console.error(exception);
    } finally {
        window.requestAnimationFrame(gameLoop);
    }
}

window.onload = () => { init() };
