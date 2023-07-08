// Time
let secondsPassed: number;
let oldTimeStamp: number = 0;

// Recruitment
let camel: Camel;
let lastUsedId = 0;
let recruitmentService: RecruitmentService;
let cashMoney: number;

// Race
let raceCamelCanvas: HTMLCanvasElement;
let raceBackgroundCanvas: HTMLCanvasElement;
let raceSimulation: RaceSimulation;
let raceSelection: RaceSelection;
let raceDrawing: RaceDrawing;
let gymDrawing: GymDrawing;
let race: Race;
let startRace = new Event("startRace");
let enterRaceSelection = new Event("enterRaceSelection");
let countdown: Countdown;

let leaderboardService: LeaderboardService;

// Map
let map: MapOverview;

// Audio
let musicService: MusicService;

function init() {
    cashMoney = 100;

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

    recruitmentService = new RecruitmentService();

    // Race
    raceDrawing = new RaceDrawing();
    raceSimulation = new RaceSimulation();
    raceSelection = new RaceSelection();
    countdown = new Countdown();

    leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d")!);

    // Gym
    gymDrawing = new GymDrawing();

    // Map
    CanvasService.hideAllCanvas();
    MapOverview.showMap();
    MapOverview.renderMap();

    PopupService.drawAlertPopup("Welcome to Private Bates' Camel Turismo Management 2024!");

    // Audio
    musicService = new MusicService();
    window.addEventListener('keydown', () => {
        musicService.startAudio();
    })
    
    window.requestAnimationFrame(gameLoop);
    // document.addEventListener(
    //     "goToGym",
    //     (_: any) => {
    //         gymDrawing.drawGym();
    //         window.requestAnimationFrame(gameLoop);
    //     },
    //     false
    // );
}

let raceTriggeredTimestamp: number;
let enterRequestSelectionRequested: boolean = false;

function gameLoop(timeStamp: number) {
    try {
        secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
        oldTimeStamp = timeStamp;

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

        if (enterRequestSelectionRequested) {
            CanvasService.hideAllCanvas();
            CanvasService.showCanvas(CanvasNames.RaceSelection);
            CanvasService.bringCanvasToTop(CanvasNames.RaceSelection);

            raceSelection.drawSelectionScreen();

            enterRequestSelectionRequested = false;
        }

    } catch {
        console.log('error')
    } finally {
        window.requestAnimationFrame(gameLoop);
    }
}

window.onload = () => { init() };
