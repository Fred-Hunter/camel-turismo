// Time
let secondsPassed: number;
let oldTimeStamp: number = 0;

// Recruitment
let camel: Camel;
let lastUsedId = 0;
let recruitmentService: RecruitmentService;
let cashMoney = 100;

// Race
let raceCamelCanvas: HTMLCanvasElement;
let raceBackgroundCanvas: HTMLCanvasElement;
let raceSimulation: RaceSimulation;
let raceDrawing: RaceDrawing;
let gymDrawing: GymDrawing;
let race: Race;
let startRace = new Event("startRace");
let leaderboardService: LeaderboardService;

// Map
let map: MapOverview;

// Audio
let musicService: MusicService;

function init() {
    // Camel
    CanvasService.createCanvas('3', CanvasNames.Recruitment);
    CanvasService.createCanvas('1', CanvasNames.RaceBackground);
    CanvasService.createCanvas('2', CanvasNames.RaceCamel);
    CanvasService.createCanvas('4', CanvasNames.MapOverview);
    CanvasService.createCanvas('1', CanvasNames.GymCamel);
    CanvasService.createCanvas('0', CanvasNames.GymBackground);

    recruitmentService = new RecruitmentService();
    
    // Race
    raceDrawing = new RaceDrawing();
    raceSimulation = new RaceSimulation();

    leaderboardService = new LeaderboardService(CanvasService.getCanvasByName(CanvasNames.RaceCamel).getContext("2d")!);

    // Gym
    gymDrawing = new GymDrawing();

    // Map
    CanvasService.hideAllCanvas();
    MapOverview.showMap();
    MapOverview.renderMap();

    // Audio
    musicService = new MusicService();
    window.addEventListener('keydown', () => {
        musicService.startAudio();
    })
    
    document.addEventListener(
        "startRace",
        async (_: any) => {
            race = raceSimulation.createRace(camel, 60);
            musicService.setAudio("RaceAudio");
            musicService.startAudio()

            const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

            raceDrawing.drawRaceCourse(race);
            window.requestAnimationFrame(gameLoop);
            await delay(8500).then(_ => {
                raceSimulation.startRace(race);
            })
        },
        false
    );

    // document.addEventListener(
    //     "goToGym",
    //     (_: any) => {
    //         gymDrawing.drawGym();
    //         window.requestAnimationFrame(gameLoop);
    //     },
    //     false
    // );
}

function gameLoop(timeStamp: number) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    if (!!race && race.inProgress) {
        raceSimulation.simulateRaceStep(race);
    }

    raceDrawing.drawCamels(race);

    leaderboardService.drawLeaderboard();

    window.requestAnimationFrame(gameLoop);
}

window.onload = () => { init() };
