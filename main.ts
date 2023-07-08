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
let race: Race;
let startRace = new Event("startRace");

// Map
let map: MapOverview;

function init() {
    // Camel
    CanvasService.createCanvas('3', CanvasNames.Recruitment);
    CanvasService.createCanvas('1', CanvasNames.RaceBackground);
    CanvasService.createCanvas('2', CanvasNames.RaceCamel);
    CanvasService.createCanvas('4', CanvasNames.MapOverview);

    recruitmentService = new RecruitmentService();
    
    // Race
    raceDrawing = new RaceDrawing();
    raceSimulation = new RaceSimulation();

    // Map
    //map = new MapOverview();

    CanvasService.hideCanvas('map-overview');
    
    document.addEventListener(
        "startRace",
        (_: any) => {
            race = raceSimulation.createRace(camel, 1000);
            raceSimulation.startRace(race);
            raceDrawing.drawRaceCourse();
            window.requestAnimationFrame(gameLoop);
        },
        false
    );
}

function gameLoop(timeStamp: number) {
    secondsPassed = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    if (!!race && race.inProgress) {
        raceSimulation.simulateRaceStep(race);
    }

    raceDrawing.drawCamels(race);

    window.requestAnimationFrame(gameLoop);
}

window.onload = () => { init() };
